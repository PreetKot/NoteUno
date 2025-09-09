import { useState, useEffect } from "react";
import { Link } from "react-router";
import { StarIcon, ArrowLeftIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import api from "../lib/axios";
import toast from "react-hot-toast";

const StarredNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        // Filter only favorite notes
        const starredNotes = res.data.filter(note => note.isFavorite);
        setNotes(starredNotes);
      } catch (error) {
        console.log("Error fetching starred notes", error);
        toast.error("Failed to load starred notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="btn btn-ghost btn-sm">
            <ArrowLeftIcon className="size-4" />
            Back to All Notes
          </Link>
          <div className="flex items-center gap-3">
            <StarIcon className="size-8 text-yellow-500 fill-current" />
            <div>
              <h1 className="text-3xl font-bold text-base-content">Starred Notes</h1>
              <p className="text-base-content/70">
                {loading ? "Loading..." : `${notes.length} starred notes`}
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-primary py-20">Loading starred notes...</div>
        )}

        {/* Empty State */}
        {!loading && notes.length === 0 && (
          <div className="text-center py-20">
            <StarIcon className="size-16 mx-auto text-base-content/30 mb-4" />
            <h2 className="text-2xl font-semibold text-base-content mb-2">No starred notes yet</h2>
            <p className="text-base-content/70 mb-6">
              Star your important notes to see them here. Click the star icon on any note to add it to your favorites.
            </p>
            <Link to="/" className="btn btn-primary">
              Browse All Notes
            </Link>
          </div>
        )}

        {/* Notes Grid */}
        {!loading && notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard 
                key={note._id} 
                note={note} 
                setNotes={setNotes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StarredNotesPage;
