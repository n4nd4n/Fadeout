"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/Button";

export function CTASection() {
  const sparkleVariants: Variants = {
    float1: {
      y: [0, -8, 0],
      rotate: [0, 12, -12, 0],
      scale: [1, 1.1, 0.9, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    float2: {
      y: [0, 8, 0],
      rotate: [0, -12, 12, 0],
      scale: [1, 0.9, 1.1, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      },
    },
  };

  return (
    <section className="relative w-full h-[300px] bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] overflow-hidden flex items-center justify-center py-8">
      {/* Decorative Floating Sparkles (Opacity 25%) */}
      <motion.div
        variants={sparkleVariants}
        animate="float1"
        className="absolute top-10 left-[8%] md:left-[15%] text-white opacity-25 z-0"
      >
        <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
      </motion.div>

      <motion.div
        variants={sparkleVariants}
        animate="float2"
        className="absolute bottom-10 right-[8%] md:right-[15%] text-white opacity-25 z-0"
      >
        <Sparkles className="w-8 h-8 md:w-12 md:h-12" />
      </motion.div>

      <motion.div
        variants={sparkleVariants}
        animate="float1"
        className="absolute top-12 right-[25%] text-white opacity-20 hidden md:block z-0"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>

      <motion.div
        variants={sparkleVariants}
        animate="float2"
        className="absolute bottom-12 left-[25%] text-white opacity-20 hidden md:block z-0"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 select-none">
            Create your next event with FadeOut.
          </h2>

          {/* Description */}
          <p className="text-white/80 text-[14px] md:text-[15px] max-w-xl mb-6">
            Join thousands of people hosting meaningful, private events. Start your space in under 30 seconds.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <a href="https://apps.apple.com/us/app/fadeout-plan-share-fade/id6759956264" target="_blank" rel="noopener noreferrer">
              <Button
                variant="dark"
                className="gap-2 text-[13px] h-10 px-5 bg-[#111827] hover:bg-black text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71,19.5C17.88,20.74,17,21.95,15.66,22c-1.28,0-1.69-.78-3.15-.78s-1.92.75-3.15.78C8,22,7.09,20.76,6.26,19.5,4.57,17,3.29,12.42,5,9.45c.86-1.48,2.39-2.42,4.06-2.44,1.27,0,2.46.88,3.24.88s2.21-1.07,3.72-.92a4.93,4.93,0,0,1,3.87,2.13,4.82,4.82,0,0,0-2.88,4.36c0,3.46,2.83,4.68,2.86,4.69A10.93,10.93,0,0,1,18.71,19.5M15.94,4.17c.66-.81,1.11-1.93.99-3A3,3,0,0,0,14.88,2c-.62.72-1.08,1.85-.94,2.91A2.78,2.78,0,0,0,15.94,4.17" />
                </svg>
                App Store
              </Button>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.app.fadeout" target="_blank" rel="noopener noreferrer">
              <Button
                variant="dark"
                className="gap-2 text-[13px] h-10 px-5 bg-[#111827] hover:bg-black text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M5,22.06c-.5,0-.93-.3-1.1-.76-.08-.22-.12-.47-.12-.73V3.43c0-.26.04-.51.12-.73.17-.46.6-.76,1.1-.76.19,0,.38.04.56.12l14.1,8.14c.72.42.72,1.46,0,1.88L5.56,21.94c-.18.08-.37.12-.56.12M6.15,4.68V19.32l12.67-7.32L6.15,4.68Z" />
                </svg>
                Play Store
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
