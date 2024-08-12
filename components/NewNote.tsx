import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Favorite from "./Favorite";
import { NewNoteProps } from "@/utils/types";

export default function NewNote({
  title = "Título",
  placeholder = "Criar nota...",
  onNoteCreated,
}: NewNoteProps) {
  const [noteTitle, setNoteTitle] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = async () => {
    const newNote = {
      title: noteTitle,
      content: content,
      favorite: isFavorite,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/notes`,
        newNote,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      onNoteCreated(response.data);

      setIsFavorite(false);
      setNoteTitle("");
      setContent("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error ao salvar a nota:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isModalOpen]);

  return (
    <div className="relative w-80 sm:w-96 h-28 bg-white border border-gray-300 rounded-3xl md:rounded-none shadow-sm">
      <div className="flex items-center justify-between m-2">
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder={title}
          className="text-gray-599 font-bold border-none focus:outline-none w-full mr-2"
        />
        <Favorite
          isFavorite={isFavorite}
          onToggle={() => setIsFavorite(!isFavorite)}
        />
      </div>
      <hr className="border-t border-gray-299 w-full" />
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute mx-2 w-80 h-16 text-start text-gray-200 font-semibold"
      >
        Criar nota
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <textarea
              ref={textAreaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-none pt-2 text-gray-500 border border-gray-300 rounded-lg focus:outline-none resize-none h-40"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
