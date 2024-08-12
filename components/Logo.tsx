import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src={"icon-note.svg"}
        alt="Imagem de bloco de notas, logo da Core Notes"
        width={25}
        height={25}
      />
      <p className="mx-2">CoreNotes</p>
    </div>
  );
}
