import React from "react";
// @ts-ignore
import imageDemo from "../assets/images/regenerated_image_1779411133237.jpg";

export default function HeaderBrandBanner() {
  return (
    <div 
      id="header-brand-banner"
      className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 select-none transition-all duration-500 hover:shadow-xl"
    >
      <img 
        src={imageDemo} 
        alt="Santinho Virtual Banner" 
        className="w-full h-auto object-cover block"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

