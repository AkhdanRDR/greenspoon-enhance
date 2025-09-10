"use client";

import { useState, useEffect } from "react";

export default function Moto() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("moto");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="moto"
      className="relative py-24 bg-gradient-to-b from-green-50 to-white overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          className={`text-responsive-xl font-['Playfair_Display'] font-bold text-gray-900 mb-6 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          &quot;Dari Ladang ke Meja Anda, dengan Cinta dan Keberlanjutan&quot;
        </h2>

        <p
          className={`max-w-2xl mx-auto text-gray-600 leading-relaxed text-lg transition-all duration-700 delay-200 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Visi kami sederhana: menjadikan resep dan bahan lokal lebih dekat
          dengan kehidupan sehari-hari, menjaga tradisi sekaligus menghadirkan
          rasa modern.
        </p>
      </div>
    </section>
  );
}
