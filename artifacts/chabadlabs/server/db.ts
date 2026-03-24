import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

let db: Database.Database | null = null;

export function initDb(): Database.Database {
  const dbPath = path.join(import.meta.dirname, "..", "data", "chabadlabs.db");

  // Ensure data directory exists
  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  db = new Database(dbPath);

  // Enable WAL mode for better concurrent access
  db.pragma("journal_mode = WAL");

  // Create submissions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      data TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Create webinars table
  db.exec(`
    CREATE TABLE IF NOT EXISTS webinars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      presenter TEXT NOT NULL DEFAULT '',
      difficulty TEXT NOT NULL DEFAULT 'Beginner',
      summary TEXT NOT NULL DEFAULT '',
      takeaways TEXT NOT NULL DEFAULT '[]',
      recording_url TEXT NOT NULL DEFAULT '#',
      youtube_id TEXT DEFAULT '',
      tags TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  console.log("Database initialized at", dbPath);
  return db;
}

export function getDb(): Database.Database {
  if (!db) throw new Error("Database not initialized. Call initDb() first.");
  return db;
}
