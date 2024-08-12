"use client";
import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Lógica para realizar la búsqueda
    console.log("Buscando:", searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full flex justify-between items-center">
      <div className="w-full flex justify-start items-center">
        <input
          type="search"
          name="search"
          placeholder="Pesquisar nota"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-48 sm:w-96 lg:w-9/12 h-7 left-[149px] top-[16px] rounded text-sm focus:outline-none shadow-md border border-solid border-gray-300 pl-1"
        />
        <button
          onClick={handleSearch}
          className="relative w-4 h-4 right-8 flex justify-center items-center"
        >
          <FiSearch className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={handleClear}
        className="flex justify-center items-center"
      >
        <FiX className="w-4 h-4" />
      </button>
    </div>
  );
}
