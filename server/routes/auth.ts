import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// This allows a user to "claim" a team in a room
router.post("/login", async (req, res) => {
  const { roomId, teamName, role } = req.body; 

  try {
    // Check if the team is already taken in this room
    // For now, we'll just return a success and a "Team ID"
    // In a full app, you'd save this user to the database
    res.json({
      success: true,
      teamId: teamName, // e.g., "MI"
      role: role, // "bidder" or "admin"
      message: `Logged in as ${teamName}`
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;