import express from 'express';
import { getProfile, login, logout, signup } from '../controller/user.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post("/signUp",signup);
userRoutes.post("/login",login);
userRoutes.post("/logout",logout);
userRoutes.get("/profile",authenticateUser,getProfile);

export default userRoutes;