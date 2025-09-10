"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("about");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: "🧺",
      title: "Pilih Hasil Panen Segar",
      description:
        "Sayuran dan bahan organik yang dipetik langsung dari kebun petani Malang di pagi hari.",
    },
    {
      icon: "📜",
      title: "Ikuti Resep Warisan",
      description:
        "Resep turun-temurun dari petani Malang, sederhana namun kaya rasa dan budaya.",
    },
    {
      icon: "🌾",
      title: "Dukung Petani Lokal",
      description:
        "Setiap masakan yang Anda buat ikut memperkuat ekonomi petani dan melestarikan budaya lokal.",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-b from-white to-green-50 overflow-hidden"
    >
      {/* Background image with simple overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/model_farm_worker.jpg"
          alt="Petani Malang di sawah terasering"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-green-50/80" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            Proses Tradisional Petani Malang
          </span>

          <h2 className="mt-6 font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-gray-900">
            Dari Ladang ke Meja Makan
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Green Spoon menjembatani warisan kuliner petani lokal dengan dapur
            modern. Berikut tiga langkah sederhana yang membuatnya istimewa.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-white shadow-md hover:shadow-lg p-8 text-center transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-xl bg-green-50 text-3xl mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats / CTA */}
        <div
          className={`mt-20 flex flex-col sm:flex-row justify-center gap-6 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Stat label="Tahun Berdiri" value="2024" color="text-green-600" />
          <Stat
            label="Keluarga Terlayani"
            value="5000+"
            color="text-amber-600"
          />
          <Stat label="Produk Organik" value="100%" color="text-orange-600" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}
