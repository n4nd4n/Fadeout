"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { AboutModal } from "./AboutModal";
import { TermsModal } from "./TermsModal";
import { PrivacyModal } from "./PrivacyModal";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const navLinks = [
    { label: "About FadeOut", href: "#about" },
    { label: "Terms & Conditions", href: "#terms" },
    { label: "Privacy Policy", href: "#privacy" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full h-[72px] bg-white border-b border-border-custom/80 backdrop-blur-md bg-white/95 flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group select-none">
            <span className="w-5 h-5 rounded-full border-2 border-primary mr-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-bold tracking-widest text-lg text-dark-text transition-colors duration-300">
              FADEOUT
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.label === "About FadeOut") {
                    e.preventDefault();
                    setIsAboutOpen(true);
                  } else if (link.label === "Terms & Conditions") {
                    e.preventDefault();
                    setIsTermsOpen(true);
                  } else if (link.label === "Privacy Policy") {
                    e.preventDefault();
                    setIsPrivacyOpen(true);
                  }
                }}
                className="text-[14px] text-body-text hover:text-dark-text transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://apps.apple.com/us/app/fadeout-plan-share-fade/id6759956264" target="_blank" rel="noopener noreferrer">
              <Button variant="dark" className="gap-2 text-[13px] h-10 px-5">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71,19.5C17.88,20.74,17,21.95,15.66,22c-1.28,0-1.69-.78-3.15-.78s-1.92.75-3.15.78C8,22,7.09,20.76,6.26,19.5,4.57,17,3.29,12.42,5,9.45c.86-1.48,2.39-2.42,4.06-2.44,1.27,0,2.46.88,3.24.88s2.21-1.07,3.72-.92a4.93,4.93,0,0,1,3.87,2.13,4.82,4.82,0,0,0-2.88,4.36c0,3.46,2.83,4.68,2.86,4.69A10.93,10.93,0,0,1,18.71,19.5M15.94,4.17c.66-.81,1.11-1.93.99-3A3,3,0,0,0,14.88,2c-.62.72-1.08,1.85-.94,2.91A2.78,2.78,0,0,0,15.94,4.17" />
                </svg>
                App Store
              </Button>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.app.fadeout" target="_blank" rel="noopener noreferrer">
              <Button variant="dark" className="gap-2 text-[13px] h-10 px-5">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M5,22.06c-.5,0-.93-.3-1.1-.76-.08-.22-.12-.47-.12-.73V3.43c0-.26.04-.51.12-.73.17-.46.6-.76,1.1-.76.19,0,.38.04.56.12l14.1,8.14c.72.42.72,1.46,0,1.88L5.56,21.94c-.18.08-.37.12-.56.12M6.15,4.68V19.32l12.67-7.32L6.15,4.68Z" />
                </svg>
                Play Store
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-dark-text hover:bg-light-bg rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed top-[72px] left-0 right-0 bg-white border-b border-border-custom z-40 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (link.label === "About FadeOut") {
                        e.preventDefault();
                        setIsAboutOpen(true);
                      } else if (link.label === "Terms & Conditions") {
                        e.preventDefault();
                        setIsTermsOpen(true);
                      } else if (link.label === "Privacy Policy") {
                        e.preventDefault();
                        setIsPrivacyOpen(true);
                      }
                    }}
                    className="text-[16px] font-medium text-body-text hover:text-dark-text py-2 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="border-t border-border-custom pt-6 flex flex-col gap-3">
                <a href="https://apps.apple.com/us/app/fadeout-plan-share-fade/id6759956264" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button
                    variant="dark"
                    onClick={() => setIsOpen(false)}
                    className="w-full gap-2 justify-center py-3"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71,19.5C17.88,20.74,17,21.95,15.66,22c-1.28,0-1.69-.78-3.15-.78s-1.92.75-3.15.78C8,22,7.09,20.76,6.26,19.5,4.57,17,3.29,12.42,5,9.45c.86-1.48,2.39-2.42,4.06-2.44,1.27,0,2.46.88,3.24.88s2.21-1.07,3.72-.92a4.93,4.93,0,0,1,3.87,2.13,4.82,4.82,0,0,0-2.88,4.36c0,3.46,2.83,4.68,2.86,4.69A10.93,10.93,0,0,1,18.71,19.5M15.94,4.17c.66-.81,1.11-1.93.99-3A3,3,0,0,0,14.88,2c-.62.72-1.08,1.85-.94,2.91A2.78,2.78,0,0,0,15.94,4.17" />
                    </svg>
                    App Store
                  </Button>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.app.fadeout" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button
                    variant="dark"
                    onClick={() => setIsOpen(false)}
                    className="w-full gap-2 justify-center py-3"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M5,22.06c-.5,0-.93-.3-1.1-.76-.08-.22-.12-.47-.12-.73V3.43c0-.26.04-.51.12-.73.17-.46.6-.76,1.1-.76.19,0,.38.04.56.12l14.1,8.14c.72.42.72,1.46,0,1.88L5.56,21.94c-.18.08-.37.12-.56.12M6.15,4.68V19.32l12.67-7.32L6.15,4.68Z" />
                    </svg>
                    Play Store
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About Modal overlay */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* Terms & Conditions Modal overlay */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

      {/* Privacy Policy Modal overlay */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  );
}
