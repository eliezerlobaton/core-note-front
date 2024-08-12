import { NoteEditProps } from "@/utils/types";
import { useState } from "react";

export default function NoteEdit({ note, onSave, onCancel }: NoteEditProps) {
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSave = () => {
    const updatedNote = { ...note, content: editedContent };
    onSave(updatedNote);
  };

  return (
    <div className="relative w-80 sm:w-96 h-96 bg-white border border-gray-300 rounded-xl shadow-sm p-3 flex space-x-2 z-50">
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="w-full h-3/4 p-2 border rounded focus:outline-none"
        placeholder="Edit your note..."
      />
      <div className="absolute bottom-2 right-3 flex space-x-2">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Guardar
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
