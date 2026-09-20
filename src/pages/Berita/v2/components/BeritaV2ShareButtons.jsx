import { useState } from "react";
import { FiExternalLink, FiShare2, FiCheck } from "react-icons/fi";
import { FaWhatsapp, FaTwitter } from "react-icons/fa";

/**
 * Komponen tombol berbagi ke media sosial (WhatsApp, Twitter/X, dan Salin Link)
 */
export default function BeritaV2ShareButtons({ title, currentUrl }) {
  const [copied, setCopied] = useState(false);

  const url =
    currentUrl || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = encodeURIComponent(
    `${title || "Berita"} - Magister Kenotariatan UNISSULA`
  );

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 mr-1">
        Bagikan:
      </span>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-7 h-7 rounded-xs bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
        title="Bagikan ke WhatsApp"
      >
        <FaWhatsapp className="text-xs" />
      </a>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-7 h-7 rounded-xs bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
        title="Bagikan ke Twitter / X"
      >
        <FaTwitter className="text-xs" />
      </a>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopyLink}
        className="h-7 px-2.5 rounded-xs bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs flex items-center space-x-1 transition-colors cursor-pointer"
        title="Salin Tautan Berita"
      >
        {copied ? (
          <>
            <FiCheck className="text-green-600 text-xs" />
            <span className="text-[11px] font-medium text-green-700">Tersalin!</span>
          </>
        ) : (
          <>
            <FiShare2 className="text-xs" />
            <span className="text-[11px] font-medium">Salin</span>
          </>
        )}
      </button>
    </div>
  );
}
