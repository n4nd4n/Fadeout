"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom elegant ease-out
      },
    },
  };

  return (
    <section className="relative w-full h-[700px] overflow-hidden flex items-center justify-center">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: "url('/event_crowd.png')",
        }}
      />

      {/* Overlay with 78% White */}
      <div
        className="absolute inset-0 z-1"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.78)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-[42px] leading-[1.1] md:text-[72px] md:leading-[1.1] font-bold tracking-tight text-dark-text select-none"
          >
            Moments fade.
            <br />
            <span className="text-primary block mt-1">Memories stay.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-[16px] md:text-[18px] text-body-text max-w-[600px] leading-relaxed"
          >
            Create private, ephemeral event spaces where your memories are preserved
            and the digital noise fades away.
          </motion.p>

          {/* Interactive Indicator (Subtle Floating visual element) */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary/70"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <span>Scroll to explore</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
