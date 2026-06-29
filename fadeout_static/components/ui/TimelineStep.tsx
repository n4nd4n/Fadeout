"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface TimelineStepProps {
  number: number;
  title: string;
  description: string;
  alignment: "left" | "right";
  isLast?: boolean;
}

export function TimelineStep({
  number,
  title,
  description,
  alignment,
  isLast = false,
}: TimelineStepProps) {
  // Animation variants for the step content
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Animation variants for the circle
  const circleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 200 } },
  };

  return (
    <div className="relative grid grid-cols-[64px_1fr] md:grid-cols-[1fr_64px_1fr] gap-6 md:gap-12 items-center w-full min-h-[140px]">
      {/* 1. Left side content (Desktop only) */}
      <div className="hidden md:block w-full">
        {alignment === "left" && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-right pr-4"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 block">
              Step {number}
            </span>
            <h3 className="text-xl font-bold text-dark-text mb-2">{title}</h3>
            <p className="text-[15px] leading-relaxed text-body-text max-w-md ml-auto">
              {description}
            </p>
          </motion.div>
        )}
      </div>

      {/* 2. Timeline Circle & Line */}
      <div className="flex flex-col items-center justify-self-center h-full relative">
        {/* Numbered Circle */}
        <motion.div
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold shadow-md z-10 shrink-0 border-4 border-white"
        >
          {number}
        </motion.div>

        {/* Small line connector if not last (handled at parent container usually, but this is a fallback connector or spacer) */}
      </div>

      {/* 3. Right side content (Mobile & Desktop Right) */}
      <div className="w-full">
        {/* On desktop, visible only if alignment is right. On mobile, always visible. */}
        <div className="md:hidden block">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="pl-2"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 block">
              Step {number}
            </span>
            <h3 className="text-xl font-bold text-dark-text mb-2">{title}</h3>
            <p className="text-[15px] leading-relaxed text-body-text">
              {description}
            </p>
          </motion.div>
        </div>

        <div className="hidden md:block">
          {alignment === "right" && (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-left pl-4"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 block">
                Step {number}
              </span>
              <h3 className="text-xl font-bold text-dark-text mb-2">{title}</h3>
              <p className="text-[15px] leading-relaxed text-body-text max-w-md">
                {description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
