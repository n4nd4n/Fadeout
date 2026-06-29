"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "dark" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 select-none text-[15px] h-11 px-6 py-2.5 rounded-btn cursor-pointer";

    const variants = {
      primary: "bg-primary hover:bg-primary-hover text-white shadow-xs",
      dark: "bg-dark-text hover:bg-black text-white shadow-xs",
      outline:
        "border border-border-custom bg-transparent hover:bg-light-bg text-dark-text",
      ghost: "bg-transparent hover:bg-light-bg text-body-text hover:text-dark-text",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
