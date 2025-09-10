"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Searchbar from "@/components/Searchbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileSearch = (value: string) => {
    router.push(`/recipes?s=${encodeURIComponent(value)}`);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/#", label: "Beranda", icon: "🏠" },
    { href: "/recipes", label: "Resep Petani", icon: "📚" },
    { href: "/#about", label: "Tentang Kami", icon: "🌾" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div
          className={`backdrop-blur-md border-b transition-all duration-500 ${
            scrolled ? "bg-white/90 shadow-sm" : "bg-white/70"
          }`}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 max-w-7xl mx-auto">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icons/Logo.svg"
                alt="Green Spoon - Resep Petani Malang"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="font-bold text-lg hidden sm:block">
                <span className="text-gradient font-['Playfair_Display']">
                  GREEN
                </span>
                <span className="text-amber-600 font-['Playfair_Display']">
                  {" "}
                  SPOON
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="group relative flex items-center gap-2 font-medium text-gray-700 hover:text-green-700 transition-colors"
                >
                  <span>{link.icon}</span>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-amber-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              <Searchbar
                onSubmit={(v) =>
                  router.push(`/recipes?s=${encodeURIComponent(v)}`)
                }
              />
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-current transform transition ${
                    mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transform transition ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-md border-t px-6 py-6 space-y-4">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="flex items-center gap-3 text-gray-700 hover:text-green-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}

              {/* Search */}
              <div className="pt-4 border-t">
                <Searchbar onSubmit={handleMobileSearch} />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Spacer */}
      <div className={scrolled ? "h-[64px]" : "h-[72px]"}></div>
    </>
  );
}
