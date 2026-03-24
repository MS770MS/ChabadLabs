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

// In production, serve static files
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(import.meta.dirname, "..", "dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`ChabadLabs API server running on port ${PORT}`);
});
