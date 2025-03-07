import db from "../model/db.js";

// Add a New Job
export const addJob = (req, res) => {
    const { title, company, location, description, salary } = req.body;

    if (!title || !company || !location || !description) {
        return res.status(400).json({ error: "All fields except salary are required!" });
    }

    const query = `INSERT INTO jobs (title, company, location, description, salary) VALUES (?, ?, ?, ?, ?)`;

    db.run(query, [title, company, location, description, salary || null], function (err) {
        if (err) {
            return res.status(500).json({ error: "Error inserting job" });
        }
        res.status(201).json({ message: "Job added successfully", jobId: this.lastID });
    });
};

// Get All Jobs
export const getAllJobs = (req, res) => {
    db.all("SELECT * FROM jobs ORDER BY created_at DESC", (err, jobs) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching jobs" });
        }
        res.json(jobs);
    });
};

export const insertAllJobs = (req, res) => {
    const { jobs } = req.body;

    const query = `INSERT INTO jobs (title, company, location, description, salary) VALUES (?, ?, ?, ?, ?)`;

    db.serialize(() => {
        const stmt = db.prepare(query);
        jobs.forEach(job => {
            stmt.run(job.title, job.company, job.location, job.description, job.salary, (err) => {
                if (err) {
                    console.error("Error inserting job:", err.message);
                }
            });
        });
        stmt.finalize();
    });

    res.json({ message: "All jobs inserted successfully!" });
};