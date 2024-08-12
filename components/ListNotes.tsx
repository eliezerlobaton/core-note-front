import NoteCard from "./NoteCard";
import { ListNotesProps } from "@/utils/types";

export default function ListNotes({
  notes,
  onUpdate,
  onDelete,
}: ListNotesProps) {
  const favoriteNotes = notes.filter((note) => note.favorite);
  const otherNotes = notes.filter((note) => !note.favorite);

  return (
    <div className=" space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">Favoritas</h2>
        <div className="flex flex-col gap-4 justify-center lg:flex-row lg:flex-wrap lg:gap-4">
          {favoriteNotes.length > 0 ? (
            favoriteNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))
          ) : (
            <p>Não há notas favoritas.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Outras Notas</h2>
        <div className="flex flex-col gap-4 justify-center lg:flex-row lg:flex-wrap lg:gap-4">
          {otherNotes.length > 0 ? (
            otherNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))
          ) : (
            <p>Não há outras notas.</p>
          )}
        </div>
      </div>
    </div>
  );
}
