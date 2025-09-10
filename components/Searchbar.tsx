"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export default function Searchbar({
  onSubmit,
}: {
  onSubmit?: (v: string) => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (onSubmit) onSubmit(query);
    else router.push(`/recipes?s=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 w-full max-w-sm"
    >
      <input
        type="text"
        placeholder="Cari resep lokal..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        className="p-2 bg-gradient-to-r from-green-600 to-amber-500 text-white hover:opacity-90 transition"
      >
        <FiSearch size={18} />
      </button>
    </form>
  );
}
