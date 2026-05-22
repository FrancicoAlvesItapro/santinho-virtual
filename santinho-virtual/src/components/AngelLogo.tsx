import React from "react";

interface AngelLogoProps {
  className?: string;
  size?: number;
}

export default function AngelLogo({ className = "", size = 32 }: AngelLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      id="angel-logo"
    >
      <defs>
        {/* Pastel gradient matching the user's attachment */}
        <linearGradient id="angelPastel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cfd9f6" />
          <stop offset="50%" stopColor="#e3d0f3" />
          <stop offset="100%" stopColor="#f5ceda" />
        </linearGradient>
        
        {/* Subtle drop shadow for the angel body to pop slightly */}
        <filter id="gentleShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#4a3f75" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* 1. Gradient Rounded-Corner Square Background */}
      <rect x="2" y="2" width="96" height="96" rx="16" fill="url(#angelPastel)" stroke="#ffffff" strokeWidth="0.8" />

      {/* 2. Radiating Light Rays (matching the illustration) */}
      <g stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
        {/* 12 radial rays originating from near-center pointing outward */}
        <line x1="50" y1="12" x2="50" y2="2" />
        <line x1="50" y1="88" x2="50" y2="98" />
        <line x1="12" y1="50" x2="2" y2="50" />
        <line x1="88" y1="50" x2="98" y2="50" />
        
        <line x1="23" y1="23" x2="16" y2="16" />
        <line x1="77" y1="77" x2="84" y2="84" />
        <line x1="77" y1="23" x2="84" y2="16" />
        <line x1="23" y1="77" x2="16" y2="84" />

        <line x1="33" y1="15" x2="28" y2="8" />
        <line x1="67" y1="85" x2="72" y2="92" />
        <line x1="67" y1="15" x2="72" y2="8" />
        <line x1="33" y1="85" x2="28" y2="92" />

        <line x1="15" y1="33" x2="8" y2="28" />
        <line x1="85" y1="67" x2="92" y2="72" />
        <line x1="85" y1="33" x2="92" y2="28" />
        <line x1="15" y1="67" x2="8" y2="72" />
      </g>

      {/* Angel Composition Group with filter */}
      <g filter="url(#gentleShadow)">
        
        {/* 3. Outer Feathered Wings */}
        {/* Left Wing */}
        <path
          d="M 40,55 
             C 30,52 24,40 18,52 
             C 15,58 20,64 26,62
             C 31,60 36,57 40,55 Z"
          fill="#fafafc"
        />
        <path
          d="M 40,58 
             C 28,54 20,44 19,56 
             C 18,63 24,67 31,63
             C 34,61 38,59 40,58 Z"
          fill="#ffffff"
          opacity="0.9"
        />
        <path
          d="M 42,50 
             C 30,42 22,46 20,38 
             C 19,34 23,34 30,42
             C 35,47 40,49 42,50 Z"
          fill="#ffffff"
          opacity="0.95"
        />

        {/* Right Wing */}
        <path
          d="M 60,55 
             C 70,52 76,40 82,52 
             C 85,58 80,64 74,62
             C 69,60 64,57 60,55 Z"
          fill="#fafafc"
        />
        <path
          d="M 60,58 
             C 72,54 80,44 81,56 
             C 82,63 76,67 69,63
             C 66,61 62,59 60,58 Z"
          fill="#ffffff"
          opacity="0.9"
        />
        <path
          d="M 58,50 
             C 70,42 78,46 80,38 
             C 81,34 77,34 70,42
             C 65,47 60,49 58,50 Z"
          fill="#ffffff"
          opacity="0.95"
        />

        {/* 4. White Robe (Body) */}
        <path
          d="M 41,52 
             C 41,52 45,72 34,70 
             C 34,70 41,74 50,74 
             C 59,74 66,70 66,70 
             C 55,72 59,52 59,52 
             Z"
          fill="#f4f4f8"
        />
        <path
          d="M 45,52 
             C 45,52 48,70 38,68 
             C 44,70 50,71 50,71 
             C 50,71 56,70 62,68 
             C 52,70 55,52 55,52 
             Z"
          fill="#ffffff"
        />

        {/* 5. Serene Face & Skin Tone */}
        <ellipse cx="50" cy="46" rx="10" ry="10" fill="#fce0d2" />

        {/* Closed Eyes and Smile */}
        <path
          d="M 44,46 C 45,47.5 47,47.5 48,46"
          stroke="#4a3b32"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 52,46 C 53,47.5 55,47.5 56,46"
          stroke="#4a3b32"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 48.5,51 C 49.5,52.2 50.5,52.2 51.5,51"
          stroke="#e07a7a"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* 6. Styled Brown Hair (Bob Cut from Image) */}
        <path
          d="M 50,33
             C 40,33 38,40 38,47
             C 38,51 41,51 42,49
             C 42,44 45,39 50,39
             C 55,39 58,44 58,49
             C 59,51 62,51 62,47
             C 62,40 60,33 50,33 Z"
          fill="#a47551"
        />
        <path
          d="M 50,33
             C 44,33 41,37 41,43
             C 42,45 44,41 47,40
             C 49,39.5 50,40.5 50,40.5
             C 50,40.5 51,39.5 53,40
             C 56,41 58,45 59,43
             C 59,37 56,33 50,33 Z"
          fill="#bc8f6f"
        />

        {/* 7. Floating Golden Halo (with light tilt) */}
        <ellipse
          cx="50"
          cy="31"
          rx="11"
          ry="3"
          fill="none"
          stroke="#f3ce5a"
          strokeWidth="1.8"
        />
        <ellipse
          cx="50"
          cy="31"
          rx="11"
          ry="3"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.6"
          opacity="0.7"
        />

        {/* 8. Folding Praying Hands (vivid color matching illustration) */}
        <path
          d="M 50,50 
             C 47,51 45,55 49,61 
             L 50,65 
             L 51,61 
             C 55,55 53,51 50,50 Z"
          fill="#fcd0bd"
          stroke="#ecb59f"
          strokeWidth="0.4"
        />
        {/* Simple fold lines */}
        <path
          d="M 50,51 L 50,63"
          stroke="#dec0b2"
          strokeWidth="0.5"
        />
      </g>
    </svg>
  );
}
