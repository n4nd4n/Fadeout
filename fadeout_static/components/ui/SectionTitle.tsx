"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  theme?: "light" | "dark";
}

export function SectionTitle({
  title,
  subtitle,
  description,
  className = "",
  theme = "light",
}: SectionTitleProps) {
  return (
    <div className={`text-center max-w-2xl mx-auto mb-16 px-4 ${className}`}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-widest uppercase text-primary mb-3"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`text-3xl md:text-4xl font-bold tracking-tight ${
          theme === "light" ? "text-dark-text" : "text-white"
        }`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-4 text-base md:text-lg ${
            theme === "light" ? "text-body-text" : "text-gray-300"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
