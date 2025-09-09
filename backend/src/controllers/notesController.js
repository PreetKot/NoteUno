import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    // Get notes for the authenticated user
    const notes = await Note.find({ author: req.user.userId })
      .populate("author", "name email")
      .sort({ createdAt: -1 }); // -1 will sort in desc. order (newest first)
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, author: req.user.userId })
      .populate("author", "name email");
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    
    // Process uploaded files
    const attachments = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        attachments.push({
          fileName: file.filename,
          originalName: file.originalname,
          fileType: file.mimetype,
          fileSize: file.size,
          filePath: file.path,
        });
      });
    }

    const note = new Note({ 
      title, 
      content, 
      author: req.user.userId,
      attachments: attachments
    });

    const savedNote = await note.save();
    const populatedNote = await Note.findById(savedNote._id).populate("author", "name email");
    res.status(201).json(populatedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, author: req.user.userId },
      { title, content },
      {
        new: true,
      }
    ).populate("author", "name email");

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findOneAndDelete({ 
      _id: req.params.id, 
      author: req.user.userId 
    });
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function downloadFile(req, res) {
  try {
    const { noteId, fileId } = req.params;
    
    const note = await Note.findOne({ _id: noteId, author: req.user.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });
    
    const attachment = note.attachments.id(fileId);
    if (!attachment) return res.status(404).json({ message: "File not found" });
    
    res.download(attachment.filePath, attachment.originalName);
  } catch (error) {
    console.error("Error in downloadFile controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function toggleFavorite(req, res) {
  try {
    const { isFavorite } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, author: req.user.userId },
      { isFavorite },
      { new: true }
    ).populate("author", "name email");

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in toggleFavorite controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
