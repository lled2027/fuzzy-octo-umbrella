
import Database from 'better-sqlite3'
import path from 'path'
import {fileURLToPath} from 'url'

const __fileURLToPath = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileURLToPath)
const db = new Database(path.join(__dirname, 'chat.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT
  );
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    text TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`)

export default db   