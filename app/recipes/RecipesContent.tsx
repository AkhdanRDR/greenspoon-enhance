"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Fuse from "fuse.js";
import recipesData from "@/public/data/recipes.json";
import Link from "next/link";

interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients?: string[];
  instructions?: string;
  prepTime?: string;
}

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    pages.push(1);
    if (currentPage - delta > 2) pages.push("...");

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage + delta < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
      >
        «
      </button>

      {getPageNumbers().map((page, idx) =>
        typeof page === "number" ? (
          <button
            key={idx}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-lg transition-all ${
              page === currentPage
                ? "bg-gradient-to-r from-green-600 to-amber-500 text-white font-bold shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={idx} className="px-2 text-gray-500">
            {page}
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
      >
        »
      </button>
    </div>
  );
}

export default function RecipesContent() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("s")?.toLowerCase() || "";
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fuse = new Fuse(recipesData as Recipe[], {
      keys: ["name", "ingredients", "instructions"],
      threshold: 0.3,
    });

    if (searchTerm) {
      const results = fuse.search(searchTerm).map((r) => r.item);
      setRecipes(results);
    } else {
      setRecipes(recipesData as Recipe[]);
    }

    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const section = document.getElementById("recipes-content");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // pagination logic
  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecipes = recipes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div
      id="recipes-content"
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center shadow-inner">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Resep tidak ditemukan
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Coba ubah kata kunci atau lihat semua resep.
            </p>
            <Link
              href="/recipes"
              className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-green-600 to-amber-500 text-white rounded-lg hover:from-green-700 hover:to-amber-600 transition-all text-sm font-medium shadow"
            >
              Lihat Semua Resep
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* grid resep */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipe/${recipe.id}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
              >
                <div className="relative w-full h-44 sm:h-52">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-base lg:text-lg font-bold text-slate-800 mb-2 group-hover:text-green-700 transition-colors">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {recipe.instructions?.split(". ")[0] ||
                      "Resep lengkap tersedia di detail."}
                  </p>
                  <div className="flex justify-between items-center text-gray-600 text-xs border-t border-gray-200 pt-2 mt-auto">
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      ⏱ {recipe.prepTime ?? "15–20 Min"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* pagination info */}
          <div className="text-center text-gray-600 text-sm mt-8">
            Menampilkan {startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, recipes.length)} dari{" "}
            {recipes.length} Resep
          </div>

          {/* pagination controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
}
