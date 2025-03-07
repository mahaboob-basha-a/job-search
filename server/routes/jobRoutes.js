import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { addJob, getAllJobs, insertAllJobs } from '../controller/jobs.js';

const jobRoutes = express.Router();

jobRoutes.get("/all-jobs",getAllJobs);
jobRoutes.post("/add-job",authenticateUser,addJob);
jobRoutes.post("/add-all-jobs",insertAllJobs);

export default jobRoutes;