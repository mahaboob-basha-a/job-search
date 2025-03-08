import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Correct way to get __dirname in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Correct database path inside "server/db"
const dbPath = path.join(__dirname, "tmp", "jobsearch.db");

// Ensure "db" folder exists
if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

const sql = sqlite3.verbose();

const db = new sql.Database(dbPath,(err)=>{
    if(err){

        console.log('db connection failed',err);
    }else{
        console.log('Connected to SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE,
            phone TEXT UNIQUE,
            password TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating jobs table:', err.message);
            } else {
                console.log('User table created successfully.');
            }});

        db.run(`CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            company TEXT NOT NULL,
            location TEXT NOT NULL,
            description TEXT NOT NULL,
            salary REAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating jobs table:', err.message);
            } else {
                console.log('Jobs table created successfully.');
            }});
    }
})

export default db;