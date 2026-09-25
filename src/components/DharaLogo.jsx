import React from 'react';

export default function DharaLogo({ className = "h-12 w-auto", showText = true, size = "md" }) {
  const iconSize = size === "lg" ? "w-10 h-10" : size === "xl" ? "w-40 h-40" : "w-8 h-8";

  return (
    <div className={`flex items-center gap-3 select-none ${size === "xl" ? "flex-col text-center" : ""}`}>
      {/* New custom Himalayan Earth emblem */}
      <div className={`relative flex items-center justify-center flex-shrink-0 ${iconSize}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="riverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0284c7" />
              <stop offset="100%" stop-color="#38bdf8" />
            </linearGradient>
          </defs>
          {/* Earth base */}
          <circle cx="100" cy="100" r="92" stroke="#1b4332" strokeWidth="8" fill="#f4efe6" />
          {/* Sky background */}
          <path d="M12 100 C 12 50, 50 12, 100 12 C 150 12, 188 50, 188 100 Z" fill="#e2e8f0" />
          {/* River with gradient */}
          <path d="M 15,110 Q 70,140 185,110 L 188,135 Q 100,180 12,135 Z" fill="url(#riverGrad)" />
          {/* Mountain silhouettes */}
          <polygon points="40,110 85,45 125,110" fill="#2d6a4f" />
          <polygon points="90,110 135,35 175,110" fill="#1b4332" />
          <polygon points="65,110 105,55 145,110" fill="#40916c" opacity="0.8" />
          {/* Snow caps */}
          <polygon points="85,45 95,60 75,60" fill="#ffffff" />
          <polygon points="135,35 147,52 123,52" fill="#ffffff" />
          {/* Satellite orbit */}
          <path d="M 30,40 Q 100,5 170,40" stroke="#0284c7" strokeWidth="3" stroke-dasharray="4,4" />
          <rect x="145" y="20" width="14" height="10" rx="2" fill="#0284c7" transform="rotate(-20 150 25)" />
          <line x1="140" y1="25" x2="164" y2="25" stroke="#ffffff" strokeWidth="2" />
          {/* Shield */}
          <path d="M 100,105 L 125,115 C 125,145 100,165 100,165 C 100,165 75,145 75,115 Z" fill="#1b4332" stroke="#52b788" strokeWidth="3" />
          <polygon points="100,118 116,146 84,146" fill="#c05621" />
          {/* Brand name */}
          <text x="100" y="142" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold" fontFamily="sans-serif">!</text>
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1 leading-none">
            <span className="font-black tracking-tight text-[#52b788] text-base uppercase">
              DHARA
            </span>
            <span className="font-black tracking-tight text-[#c05621] text-base uppercase">
              ALERT
            </span>
          </div>
          <span className="text-[10px] font-semibold tracking-wider text-[#475569] uppercase mt-0.5">
            Smarter Warnings. Safer Hills.
          </span>
        </div>
      )}
    </div>
  );
}
