"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // small entrance delay for subtle effect
    const t = setTimeout(() => setIsVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      aria-label="Hero - Resep Petani Lokal"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white overflow-hidden"
    >
      {/* Background layer: single photo + subtle gradient + pattern */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/model_farm_worker.jpg"
          alt="Petani Malang di ladang"
          fill
          className="object-cover opacity-50"
          priority
        />
        {/* single soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80"></div>
        {/* faint pattern for local identity (kept very subtle) */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="batik-pattern h-full w-full" />
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
          {/* Left: Intro */}
          <div
            className={`space-y-6 text-center lg:text-left transition-all duration-700 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-3 bg-white/80 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Resep & Bahan Lokal • UMKM Petani
            </div>

            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-5xl leading-tight font-bold text-gray-900">
              Dari Ladang Lokal
              <br />
              <span className="block text-gradient-gold">
                ke Dapur Keluarga
              </span>
            </h1>

            <p className="text-gray-700 max-w-xl leading-relaxed">
              Koleksi resep praktis dan teruji dari petani lokal. Mudah diikuti,
              bahan dari pasar terdekat, mendukung UMKM & keberlanjutan.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
              <Link
                href="#recipes"
                className="btn-primary inline-flex items-center justify-center py-3 px-6 rounded-2xl text-white font-semibold shadow-sm hover:scale-[1.02] transition-transform"
                aria-label="Jelajahi Resep Petani"
              >
                <span className="mr-2" aria-hidden>
                  🌾
                </span>
                Jelajahi Resep
              </Link>

              <Link
                href="/#about"
                className="btn-secondary inline-flex items-center justify-center py-3 px-6 rounded-2xl font-semibold shadow-sm"
                aria-label="Tentang Kami"
              >
                Cerita Kami
              </Link>
            </div>

            {/* compact stats */}
            <div className="flex gap-4 justify-center lg:justify-start mt-6">
              <Stat label="Resep" value="50+" />
              <Stat label="Petani" value="20+" />
              <Stat label="Bahan Lokal" value="100%" />
            </div>
          </div>

          {/* Right: Clean visual card (image + badges) */}
          <div
            className={`flex items-center justify-center transition-all duration-700 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-full max-w-md bg-white rounded-2xl p-4 shadow-lg card-shadow hover:card-shadow-hover transition-shadow">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/mix_salad.png"
                  alt="Sayuran segar dari petani Malang"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 400px, 100vw"
                />

                <div className="absolute left-4 top-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold">
                  Fresh • Lokal
                </div>

                <div className="absolute right-4 bottom-4 bg-gradient-to-r from-green-500 to-amber-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  100% Organic
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-lg text-gray-900">
                  Salad Sawah Malang
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  Campuran sayuran segar langsung dari petani. Resep singkat,
                  mudah, cocok untuk keluarga. Dukungan untuk UMKM lokal.
                </p>

                <div className="mt-4 flex gap-3">
                  <Link
                    href="/recipes/salad-sawah"
                    className="text-sm font-semibold py-2 px-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                  >
                    Lihat Resep
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-semibold py-2 px-3 rounded-lg border border-transparent bg-green-50 text-green-700"
                  >
                    Hubungi Petani
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-lg font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}
