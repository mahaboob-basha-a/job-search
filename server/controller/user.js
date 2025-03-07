import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../model/db.js";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const isProduction = process.env.DEV === 'production'

// User Signup
export const signup = (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: "Error hashing password" });
        }

        // Insert user into the database
        db.run(
            `INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)`,
            [name, email, phone, hashedPassword],
            function (err) {
                if (err) {
                     
                    return res.status(400).json({ message: "User email or mobile already exists" });
                }
                res.status(201).json({ message: "User registered successfully", userId: this.lastID });
            }
        );
    });
};

// User Login
export const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required!" });
    }

    // Fetch user from DB
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: "Error checking password" });
            }
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, { expiresIn: "7d" });

            res.cookie('token',token,{httpOnly:true,secure:isProduction,sameSite:isProduction ? 'none' : 'lax'}).status(200).json({ message: "Login successful", token });
        });
    });
};

// Logout function to clear the cookie
export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};

// get profile
export const getProfile = async (req,res)=>{
    try {  
        const userProfile = req.user;
        res.status(200).json({message:"user profile",user:userProfile})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}