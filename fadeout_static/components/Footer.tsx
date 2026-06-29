"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-border-custom/80 py-8 select-none">
      <div className="w-full max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center text-[13px] text-body-text">
        {/* Left Side: Attribution */}
        <div>
          Designed and Developed by{" "}
          <a
            href="https://www.hiddenbrains.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-dark-text hover:text-primary transition-colors cursor-pointer"
          >
            Hidden Brains
          </a>
        </div>

        {/* Right Side: Copyright */}
        <div>
          &copy; 2026 FadeOut Admin. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
