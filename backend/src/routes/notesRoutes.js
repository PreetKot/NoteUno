import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
  downloadFile,
  toggleFavorite,
} from "../controllers/notesController.js";
import { authMiddleware } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// All notes routes require authentication
router.get("/", authMiddleware, getAllNotes);
router.get("/:id", authMiddleware, getNoteById);
router.post("/", authMiddleware, upload.array('attachments', 5), createNote); // Allow up to 5 files
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);
router.get("/:noteId/download/:fileId", authMiddleware, downloadFile);
router.patch("/:id/favorite", authMiddleware, toggleFavorite);

export default router;
