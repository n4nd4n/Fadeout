"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
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
                <h2 className="text-[14px] font-bold text-[#111827] mb-2.5">Terms & Conditions</h2>
                <p>
                  Welcome to FadeOut. These Terms & Conditions govern your access to and use of the FadeOut mobile application and related services. By using FadeOut, you agree to these Terms. If you do not agree, please do not use the app.
                </p>
              </div>

              {/* Section 1 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">1. Eligibility</h3>
                <p>
                  FadeOut is intended for users aged 18 years or older. By using the app, you confirm that you meet this requirement.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">2. Description of the Service</h3>
                <p className="mb-2">
                  FadeOut is an event-based communication platform that allows users to create private events, invite participants, share messages and photos within the context of an event, and allow event content to become read-only or inaccessible after a defined expiry period.
                </p>
                <p>
                  FadeOut is intentionally designed to be time-limited and ephemeral. The app does not guarantee permanent access to any content.
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">3. Accounts and Access</h3>
                <p>
                  FadeOut allows limited guest access without creating an account. Guest users may view basic event details and submit an RSVP but cannot fully participate. Full participation requires logging in through the app.
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">4. RSVP-Based Access</h3>
                <p className="mb-2">
                  Access to events and features depends on RSVP status:
                </p>
                <ul className="space-y-1.5 pl-1">
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#111827] font-bold">Going:</strong> Full access to chat and media
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#111827] font-bold">Maybe or No Response:</strong> Read-only access
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#111827] font-bold">Not Going:</strong> No access
                    </div>
                  </li>
                </ul>
                <p className="mt-2">
                  Access permissions update dynamically based on RSVP changes.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">5. User Content</h3>
                <p className="mb-2">
                  You retain ownership of any content you upload to FadeOut.
                </p>
                <p className="mb-2">
                  By submitting content, you grant FadeOut a limited, non-exclusive license to host, display, and process the content solely for the purpose of operating the service.
                </p>
                <p>
                  You are responsible for the content you share and agree not to upload content that is unlawful, abusive, or infringes the rights of others.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">6. Media Limits</h3>
                <p>
                  For MVP, photo uploads are limited per event. Uploads are first-come, first-served and limits apply equally to hosts and participants. FadeOut may adjust media limits over time.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">7. Event Expiry and Content Availability</h3>
                <p className="mb-2">
                  Each event has a predefined expiry time. After an event expires:
                </p>
                <ul className="space-y-1.5 pl-1">
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Events become read-only</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Messages and photos remain viewable</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Media downloads are disabled</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>No new messages or uploads are allowed</span>
                  </li>
                </ul>
                <p className="mt-2">
                  FadeOut does not guarantee permanent storage of any content.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">8. Account Deletion</h3>
                <p className="mb-2">
                  Participants may delete their account at any time. Upon deletion, they are removed from all active events.
                </p>
                <p className="mb-2">
                  Hosts cannot delete their account while they have active events. Active events must either expire or be deleted before account deletion.
                </p>
                <p>
                  If a host deletes their account, associated events will expire and participants will be notified.
                </p>
              </div>

              {/* Section 9 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">9. Analytics</h3>
                <p>
                  FadeOut collects limited, aggregated analytics for internal use only. Analytics are admin-only, count-based, and not visible to users.
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">10. Availability and Changes</h3>
                <p>
                  FadeOut may modify, suspend, or discontinue features or services at any time as the app evolves.
                </p>
              </div>

              {/* Section 11 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">11. Disclaimer of Warranties</h3>
                <p>
                  FadeOut is provided on an “as is” and “as available” basis. No warranties are made regarding availability, accuracy, or permanence of content.
                </p>
              </div>

              {/* Section 12 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">12. Limitation of Liability</h3>
                <p>
                  To the maximum extent permitted by law, FadeOut shall not be liable for any loss of content, loss of access, or indirect or consequential damages arising from use of the app.
                </p>
              </div>

              {/* Section 13 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">13. Governing Law</h3>
                <p>
                  These Terms are governed by and construed in accordance with the laws of England and Wales.
                </p>
              </div>

              {/* Contact Section */}
              <div className="pt-4 border-t border-[#E5E7EB]">
                <h3 className="text-[13px] font-bold text-[#111827] mb-1">14. Contact</h3>
                <p>
                  For questions or support, contact: <a href="mailto:support@fadeoutapp.com" className="font-bold text-[#111827] hover:text-primary transition-colors">support@fadeoutapp.com</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
