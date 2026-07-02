import React from 'react';
import { cn } from '../../lib/utils';

export const AuthCard = ({ children, className }) => {
  return (
    <div className={cn("bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg p-10 text-center", className)}>
      {children}
    </div>
  );
};

export const AuthInput = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full px-4 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#5E60E7] focus:border-transparent transition-all",
        className
      )}
      {...props}
    />
  );
});

AuthInput.displayName = "AuthInput";

export const AuthLabel = ({ children, htmlFor, required, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 text-left",
        className
      )}
    >
      {children}
      {required && <span className="text-error-500 ml-1">*</span>}
    </label>
  );
};

export const AuthButton = ({ children, className, variant = "primary", ...props }) => {
  return (
    <button
      className={cn(
        "w-full py-2.5 flex items-center justify-center gap-2 transition-all font-medium rounded-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
        variant === "primary" && "bg-[#5E60E7] hover:bg-[#4F46E5] text-white",
        variant === "ghost" && "text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
