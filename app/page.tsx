"use client";
import { useState, useEffect } from "react";
import NotesList from "@/components/ListNotes";
import NewNote from "@/components/NewNote";
import { Note } from "@/utils/types";
import axios from "axios";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/notes`,
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Erro ao carregar as notas", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteCreated = (newNote: Note) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleNoteUpdated = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note,
      ),
    );
  };

  const handleNoteDeleted = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <main>
      <div className="mt-10 flex justify-center items-center">
        <NewNote onNoteCreated={handleNoteCreated} />
      </div>
      <div className="m-10">
        <NotesList
          notes={notes}
          onUpdate={handleNoteUpdated}
          onDelete={handleNoteDeleted}
        />
      </div>
    </main>
  );
}
