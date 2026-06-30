"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import pageData from "./terms-and-conditions.json";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const [content, setContent] = useState(pageData.content);

  useEffect(() => {
    if (isOpen) {
      const fetchContent = async () => {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
          const response = await fetch(`${baseUrl}/api/static-page/detail/terms-and-conditions`);
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data && result.data.content) {
              setContent(result.data.content);
            }
          }
        } catch (error) {
          console.error("Failed to fetch Terms & Conditions content:", error);
        }
      };
      fetchContent();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur and Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/30 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
            className="relative bg-white w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-card shadow-2xl z-10 p-9 md:p-10 scrollbar-thin text-left select-none"
          >
            {/* Close Button inside subtle circle */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#9CA3AF] hover:text-[#111827] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Dynamic Content */}
            <div 
              className="space-y-5 text-[13px] leading-[1.65] text-[#6B7280] static-page-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
