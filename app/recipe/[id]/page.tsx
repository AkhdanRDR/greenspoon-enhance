"use client";

import Image from "next/image";
import recipesData from "@/public/data/recipes.json";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Share2, Copy, Check } from "lucide-react";

interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients?: string[];
  instructions?: string;
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  difficulty?: string;
}

export default function RecipeDetailPage() {
  const params = useParams();
  const { id } = params as { id: string };
  const recipe: Recipe | undefined = (recipesData as Recipe[]).find(
    (r) => r.id === id
  );

  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const section = document.getElementById("recipe-detail");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: recipe?.name,
      text: `Check out this recipe: ${recipe?.name}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (!recipe) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600">
          Resep tidak ditemukan
        </h1>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Kami tidak menemukan resep yang kamu cari.
        </p>
        <Link
          href="/recipes"
          className="inline-block mt-6 text-green-700 hover:underline text-sm sm:text-base"
        >
          Kembali ke daftar resep
        </Link>
      </main>
    );
  }

  return (
    <main
      id="recipe-detail"
      className="bg-gradient-to-b from-green-50 to-white min-h-screen"
    >
      <section
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 transition-all duration-700 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Header & Share */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
            {recipe.name}
          </h1>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-amber-500 hover:from-green-700 hover:to-amber-600 text-white px-4 py-2 rounded-xl shadow-sm transition text-sm sm:text-base"
          >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
            {copied ? "Tersalin!" : "Bagikan"}
          </button>
        </div>

        {/* Image + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {recipe.prepTime && (
                <InfoCard
                  label="Persiapan"
                  value={recipe.prepTime}
                  color="green"
                />
              )}
              {recipe.cookTime && (
                <InfoCard
                  label="Memasak"
                  value={recipe.cookTime}
                  color="amber"
                />
              )}
              {typeof recipe.servings === "number" && (
                <InfoCard
                  label="Porsi"
                  value={String(recipe.servings)}
                  color="emerald"
                />
              )}
              {recipe.difficulty && (
                <InfoCard
                  label="Kesulitan"
                  value={recipe.difficulty}
                  color="orange"
                />
              )}
            </div>

            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-800 mb-3 border-b border-dashed border-green-300 pb-1">
                  Bahan-Bahan 🌿
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                  {recipe.ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        {recipe.instructions && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-3 border-b border-dashed border-green-300 pb-1">
              Langkah Memasak 🍳
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
              {recipe.instructions.split("\n").map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/recipes"
            className="inline-block bg-gradient-to-r from-green-600 to-amber-500 hover:from-green-700 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-xl shadow-sm text-center transition"
          >
            Kembali ke Resep
          </Link>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl shadow-sm transition"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Tersalin!" : "Salin Link"}
          </button>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  const colors: Record<string, string> = {
    green: "bg-green-100 border-green-200 text-green-700",
    amber: "bg-amber-100 border-amber-200 text-amber-700",
    emerald: "bg-emerald-100 border-emerald-200 text-emerald-700",
    orange: "bg-orange-100 border-orange-200 text-orange-700",
  };

  return (
    <div
      className={`rounded-lg border p-3 text-center shadow-sm ${colors[color]}`}
    >
      <span className="block font-medium">{label}</span>
      <span className="font-bold text-slate-800">{value}</span>
    </div>
  );
}
