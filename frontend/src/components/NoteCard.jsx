import { PenSquareIcon, Trash2Icon, PaperclipIcon, StarIcon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of the navigation behaviour

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted one
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  const toggleFavorite = async (e, id) => {
    e.preventDefault(); // prevent navigation

    try {
      const updatedNote = await api.patch(`/notes/${id}/favorite`, {
        isFavorite: !note.isFavorite
      });
      
      setNotes((prev) => prev.map((n) => 
        n._id === id ? { ...n, isFavorite: !n.isFavorite } : n
      ));
      
      toast.success(note.isFavorite ? "Removed from favorites" : "Added to favorites");
    } catch (error) {
      console.log("Error in toggleFavorite", error);
      toast.error("Failed to update favorite");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-base-content/60">
              {formatDate(new Date(note.createdAt))}
            </span>
            {note.attachments && note.attachments.length > 0 && (
              <div className="flex items-center gap-1 text-primary">
                <PaperclipIcon className="size-3" />
                <span className="text-xs">{note.attachments.length}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              className={`btn btn-ghost btn-xs ${note.isFavorite ? 'text-yellow-500' : 'text-base-content/40'}`}
              onClick={(e) => toggleFavorite(e, note._id)}
              title={note.isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <StarIcon className={`size-4 ${note.isFavorite ? 'fill-current' : ''}`} />
            </button>
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;
