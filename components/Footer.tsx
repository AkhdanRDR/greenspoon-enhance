// Footer.tsx - versi modern konsisten
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 text-gray-700 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Logo + About */}
        <div>
          <div className="flex items-center mb-4">
            <span className="text-2xl sm:text-3xl font-bold">
              <span className="text-gradient font-['Playfair_Display']">
                GREEN
              </span>
              <span className="text-amber-600 font-['Playfair_Display']">
                {" "}
                SPOON
              </span>
            </span>
          </div>
          <p className="text-sm text-gray-600 max-w-md leading-relaxed mb-4">
            Green Spoon menghubungkan petani lokal dengan dapur Anda — membawa
            bahan segar, sehat, dan berkelanjutan. Kami merayakan kekayaan hasil
            bumi nusantara untuk menciptakan hidangan penuh rasa.
          </p>
          <p className="text-xs text-gray-500">
            © 2025 Green Spoon. All rights reserved.
          </p>
        </div>

        {/* Right: Links + Socials */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 mb-6 text-sm">
            <li>
              <Link
                href="/#"
                className="hover:text-green-600 transition-colors"
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/recipes"
                className="hover:text-green-600 transition-colors"
              >
                Resep
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="hover:text-green-600 transition-colors"
              >
                Tentang Kami
              </Link>
            </li>
          </ul>

          <div className="flex gap-4">
            <SocialIcon href="#">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="#">
              <MdEmail />
            </SocialIcon>
            <SocialIcon href="#">
              <FaXTwitter />
            </SocialIcon>
            <SocialIcon href="#">
              <FaFacebookF />
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700 transition-colors"
    >
      {children}
    </Link>
  );
}
