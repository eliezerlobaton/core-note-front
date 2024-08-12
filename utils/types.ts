// utils/types.ts

export type Note = {
  id: string;
  title: string;
  content: string;
  favorite: boolean;
  color: string;
};

export type NoteCardProps = {
  note: Note;
  onUpdate: (updatedNote: Note) => void;
  onDelete: (id: string) => void;
};
export type NewNoteProps = {
  title?: string;
  placeholder?: string;
  onNoteCreated: (newNote: Note) => void;
};

export type NoteEditProps = {
  note: Note;
  onSave: (updatedNote: Note) => void;
  onCancel: () => void;
};

export type ListNotesProps = {
  notes: Note[];
  onUpdate: (updatedNote: Note) => void;
  onDelete: (id: string) => void;
};

export type FavoriteProps = {
  isFavorite: boolean;
  onToggle: () => void;
};
