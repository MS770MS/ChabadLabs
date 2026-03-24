import express from "express";
import cors from "cors";
import path from "path";
import { initDb, getDb } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize database
initDb();

// POST /api/submissions — generic form submission endpoint
// body: { type: string, data: Record<string, any> }
app.post("/api/submissions", (req, res) => {
  try {
    const { type, data } = req.body;
    if (!type || !data) {
      res.status(400).json({ error: "Missing type or data" });
      return;
    }
    const db = getDb();
    const stmt = db.prepare(
      "INSERT INTO submissions (type, data, created_at) VALUES (?, ?, datetime('now'))"
    );
    const result = stmt.run(type, JSON.stringify(data));
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err: unknown) {
    console.error("Submission error:", err);
    res.status(500).json({ error: "Failed to save submission" });
  }
});

// GET /api/submissions — list all submissions (for admin)
// Optional query: ?type=partner or ?type=tool-recommendation
app.get("/api/submissions", (req, res) => {
  try {
    const db = getDb();
    const { type } = req.query;
    let rows;
    if (type) {
      rows = db
        .prepare(
          "SELECT * FROM submissions WHERE type = ? ORDER BY created_at DESC"
        )
        .all(type as string);
    } else {
      rows = db
        .prepare("SELECT * FROM submissions ORDER BY created_at DESC")
        .all();
    }
    // Parse the JSON data field
    const parsed = rows.map((row: Record<string, unknown>) => ({
      ...row,
      data: JSON.parse(row.data as string),
    }));
    res.json(parsed);
  } catch (err: unknown) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

// DELETE /api/submissions/:id — delete a submission (for admin)
app.delete("/api/submissions/:id", (req, res) => {
  try {
    const db = getDb();
    db.prepare("DELETE FROM submissions WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  } catch (err: unknown) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete submission" });
  }
});

// ---- Webinar CRUD endpoints ----

// GET /api/webinars — list all webinars
app.get("/api/webinars", (_req, res) => {
  try {
    const db = getDb();
    const rows = db
      .prepare("SELECT * FROM webinars ORDER BY date DESC")
      .all() as Record<string, unknown>[];
    const parsed = rows.map((row) => ({
      id: row.id,
      title: row.title,
      date: row.date,
      presenter: row.presenter,
      difficulty: row.difficulty,
      summary: row.summary,
      takeaways: JSON.parse(row.takeaways as string),
      recordingUrl: row.recording_url,
      youtubeId: row.youtube_id || undefined,
      tags: JSON.parse(row.tags as string),
    }));
    res.json(parsed);
  } catch (err: unknown) {
    console.error("Webinar fetch error:", err);
    res.status(500).json({ error: "Failed to fetch webinars" });
  }
});

// POST /api/webinars — create a webinar
app.post("/api/webinars", (req, res) => {
  try {
    const { title, date, presenter, difficulty, summary, takeaways, recordingUrl, youtubeId, tags } = req.body;
    if (!title || !date) {
      res.status(400).json({ error: "Missing title or date" });
      return;
    }
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO webinars (title, date, presenter, difficulty, summary, takeaways, recording_url, youtube_id, tags, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `);
    const result = stmt.run(
      title,
      date,
      presenter || "",
      difficulty || "Beginner",
      summary || "",
      JSON.stringify(takeaways || []),
      recordingUrl || "#",
      youtubeId || "",
      JSON.stringify(tags || [])
    );
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err: unknown) {
    console.error("Webinar create error:", err);
    res.status(500).json({ error: "Failed to create webinar" });
  }
});

// PUT /api/webinars/:id — update a webinar
app.put("/api/webinars/:id", (req, res) => {
  try {
    const { title, date, presenter, difficulty, summary, takeaways, recordingUrl, youtubeId, tags } = req.body;
    const db = getDb();
    const stmt = db.prepare(`
      UPDATE webinars SET title=?, date=?, presenter=?, difficulty=?, summary=?, takeaways=?, recording_url=?, youtube_id=?, tags=?, updated_at=datetime('now')
      WHERE id=?
    `);
    stmt.run(
      title,
      date,
      presenter || "",
      difficulty || "Beginner",
      summary || "",
      JSON.stringify(takeaways || []),
      recordingUrl || "#",
      youtubeId || "",
      JSON.stringify(tags || []),
      req.params.id
    );
    res.json({ success: true });
  } catch (err: unknown) {
    console.error("Webinar update error:", err);
    res.status(500).json({ error: "Failed to update webinar" });
  }
});

// DELETE /api/webinars/:id — delete a webinar
app.delete("/api/webinars/:id", (req, res) => {
  try {
    const db = getDb();
    db.prepare("DELETE FROM webinars WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  } catch (err: unknown) {
    console.error("Webinar delete error:", err);
    res.status(500).json({ error: "Failed to delete webinar" });
  }
});

// POST /api/webinars/seed — seed from JSON (one-time import)
app.post("/api/webinars/seed", (req, res) => {
  try {
    const { webinars } = req.body;
    if (!Array.isArray(webinars)) {
      res.status(400).json({ error: "Expected { webinars: [...] }" });
      return;
    }
    const db = getDb();
    const count = (db.prepare("SELECT COUNT(*) as c FROM webinars").get() as { c: number }).c;
    if (count > 0) {
      res.json({ success: true, message: "Already seeded", count });
      return;
    }
    const stmt = db.prepare(`
      INSERT INTO webinars (title, date, presenter, difficulty, summary, takeaways, recording_url, youtube_id, tags, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `);
    const insertMany = db.transaction((items: typeof webinars) => {
      for (const w of items) {
        stmt.run(
          w.title, w.date, w.presenter || "", w.difficulty || "Beginner",
          w.summary || "", JSON.stringify(w.takeaways || []),
          w.recordingUrl || "#", w.youtubeId || "",
          JSON.stringify(w.tags || [])
        );
      }
    });
    insertMany(webinars);
    res.json({ success: true, imported: webinars.length });
  } catch (err: unknown) {
    console.error("Webinar seed error:", err);
    res.status(500).json({ error: "Failed to seed webinars" });
  }
});

// In production, serve static files
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(import.meta.dirname, "..", "dist", "public");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`ChabadLabs API server running on port ${PORT}`);
});
