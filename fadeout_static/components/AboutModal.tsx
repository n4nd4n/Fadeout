"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
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

            {/* Static Content */}
            <div className="space-y-5 text-[13px] leading-[1.65] text-[#6B7280]">
              {/* Title Section */}
              <div>
                <h2 className="text-[14px] font-bold text-[#111827] mb-2.5">About FadeOut</h2>
                <p>
                  FadeOut is a simple way to plan moments with the people who matter, without turning your life into an endless group chat.
                </p>
              </div>

              {/* Second Paragraph */}
              <p>
                We built FadeOut for real events. A dinner. A padel match. A birthday. A weekend plan. You create an event, invite people, and keep everything in one place. RSVP, chat, and share photos for the event only. Then, when the moment is over, the event fades out.
              </p>

              {/* Section 1 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">Why FadeOut exists</h3>
                <p>
                  Most messaging apps were built for ongoing conversations. Events are different. They have a start, an end, and a short window where coordination matters. FadeOut keeps the focus on the moment, reduces clutter, and helps everyone stay present.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-3">What makes FadeOut different</h3>
                <ul className="space-y-3.5 pl-1">
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#111827] block font-bold">Event-based by design</strong>
                      <span>Every chat and photo stays inside the event.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#111827] block font-bold">Lightweight and private</strong>
                      <span>No feeds, no followers, no public profiles.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#111827] block font-bold">Built to Fade</strong>
                      <span>Events are time-bound, so your app stays clean and your conversations don't linger forever.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">Our promise</h3>
                <p>
                  We keep FadeOut minimal and respectful. We don't sell your personal data. We don't build addictive features. We aim to give you a calm space for real-life plans.
                </p>
              </div>

              {/* Contact Section */}
              <div className="pt-4 border-t border-[#E5E7EB]">
                <h3 className="text-[13px] font-bold text-[#111827] mb-1">Contact</h3>
                <p>
                  Questions or support: <a href="mailto:support@fadeoutapp.com" className="font-bold text-[#111827] hover:text-primary transition-colors">support@fadeoutapp.com</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
