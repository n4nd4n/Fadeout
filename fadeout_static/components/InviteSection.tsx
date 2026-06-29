"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Link2 } from "lucide-react";

export function InviteSection() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static site - no functional form submission required
  };

  return (
    <section className="py-[120px] bg-[#EEF2FF] w-full flex items-center justify-center">
      <div className="w-full max-w-[1280px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-dark-text mb-4">
            Already have an invite?
          </h2>
          <p className="text-[16px] md:text-[18px] text-body-text mb-10 max-w-md mx-auto">
            Paste your event link to join the private space.
          </p>

          {/* Form / Input Container */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-2.5 rounded-[24px] md:rounded-full border border-border-custom shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-3 max-w-[580px] w-full mx-auto"
          >
            {/* Input Wrapper with Link Icon */}
            <div className="relative flex-1 flex items-center px-4">
              <Link2 className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Paste your event link here"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent border-0 outline-hidden focus:ring-0 text-dark-text text-[15px] placeholder:text-gray-400 py-3"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="py-3 px-8 text-[15px] whitespace-nowrap h-12 flex items-center justify-center gap-2 rounded-btn"
            >
              Open RSVP Link
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
