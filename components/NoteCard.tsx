import { Note, NoteCardProps } from "@/utils/types";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Favorite from "./Favorite";
import { IoMdColorFill } from "react-icons/io";
import NoteEdit from "./NoteEdit";
import { Colors } from "@/utils/Colors";
import axios from "axios";

export default function NoteCard({ note, onUpdate, onDelete }: NoteCardProps) {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const handleFavoriteToggle = async () => {
    try {
      const updatedNote = { ...note, favorite: !note.favorite };
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/${note.id}`,
        updatedNote,
      );
      onUpdate(updatedNote);
    } catch (error) {
      console.error("Error al actualizar la nota", error);
    }
  };

  const handleEdit = () => {
    setEditingNote(note);
  };

  const handleSaveEdit = async (updatedNote: Note) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/${updatedNote.id}`,
        updatedNote,
      );
      onUpdate(updatedNote);
    } catch (error) {
      console.error("Error al guardar los cambios", error);
    }
    setEditingNote(null);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  const handleColorSelect = async (color: string) => {
    try {
      const updatedNote = { ...note, color };
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/${note.id}`,
        updatedNote,
      );
      onUpdate(updatedNote);
    } catch (error) {
      console.error("Error al cambiar el color", error);
    }
    setShowColorPicker(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notes/${note.id}`);
      onDelete(note.id);
    } catch (error) {
      console.error("Error al eliminar la nota", error);
    }
  };

  return (
    <div
      className="relative w-80 h-96 m-3 bg-white border border-gray-300 rounded-xl shadow-sm flex-1 min-w-80 max-w-80 min-h-96 maxh-96"
      style={{ backgroundColor: note.color }}
    >
      <h4 className="text-lg font-semibold p-4">{note.title}</h4>
      <div className="absolute top-2 right-2 p-2">
        <Favorite isFavorite={note.favorite} onToggle={handleFavoriteToggle} />
      </div>
      <div className="absolute bottom-2 left-2 flex space-x-2 items-center">
        <button
          onClick={handleEdit}
          title="Edit Note"
          className="p-2 text-gray-500 hover:text-blue-500"
        >
          <FaPencilAlt />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            title="Change Color"
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <IoMdColorFill
              className={`text-gray-500 ${note.color ? `text-[${note.color}]` : ""}`}
            />
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-2 p-2 bg-white border rounded shadow-lg flex space-x-2 z-50">
              {Object.values(Colors).map((color) => (
                <div
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`w-8 h-8 cursor-pointer rounded-full ${color === note.color ? "border-2 border-yellow-500" : ""}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="absolute bottom-2 right-2 p-2 text-gray-500 hover:text-red-500"
        title="Delete Note"
      >
        <FaTimes />
      </button>
      <hr className="border-t border-gray-300 mb-2" />
      <p className="text-gray-500 mb-4 p-4">{note.content}</p>
      {editingNote && (
        <NoteEdit
          note={editingNote}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}
