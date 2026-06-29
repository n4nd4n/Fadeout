"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
                <h2 className="text-[14px] font-bold text-[#111827] mb-2.5">Privacy Policy</h2>
                <p className="mb-3">
                  FadeOut respects your privacy and is committed to handling your personal data in a clear, minimal, and responsible way. This Privacy Policy explains how we collect, use, and protect information when you use the FadeOut mobile application and related services.
                </p>
                <p>
                  By using FadeOut, you agree to the practices described below.
                </p>
              </div>

              {/* Section 1 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">1. Information We Collect</h3>
                <p className="mb-3">
                  FadeOut collects only the information necessary to operate the service.
                </p>

                {/* Sub 1.1 */}
                <div className="mb-3">
                  <h4 className="font-bold text-[#111827] mb-1.5">1.1 Information you provide</h4>
                  <p className="mb-2">
                    Depending on how you use the app, we may collect:
                  </p>
                  <ul className="space-y-1.5 pl-1">
                    <li className="flex items-start gap-3.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                      <span>Email address (for account login and verification)</span>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                      <span>Event details (event name, date, time, fade-out duration)</span>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                      <span>RSVP responses</span>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                      <span>Messages and photos shared within events</span>
                    </li>
                  </ul>
                  <p className="mt-2">
                    Guest users may provide limited information when responding to an event invite.
                  </p>
                </div>

                {/* Sub 1.2 */}
                <div>
                  <h4 className="font-bold text-[#111827] mb-1.5">1.2 Automatically collected information</h4>
                  <p className="mb-2">
                    We may collect limited technical information, including:
                  </p>
                  <ul className="space-y-1.5 pl-1">
                    <li className="flex items-start gap-3.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                      <span>Device type and operating system</span>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                      <span>App version</span>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                      <span>Basic usage events (see Analytics section)</span>
                    </li>
                  </ul>
                  <p className="mt-2">
                    This information is used solely to operate and improve the service.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">2. Authentication</h3>
                <p className="mb-2">
                  FadeOut uses email-based authentication to verify users.
                </p>
                <p className="mb-2">
                  Authentication is managed through Firebase Authentication, a service provided by Google. FadeOut does not store passwords or verification tokens once authentication is complete.
                </p>
                <p className="mb-2">
                  Email addresses are:
                </p>
                <ul className="space-y-1.5 pl-1">
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Used only for login, account identification, and essential service communications</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Not shared with other users</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Not used for marketing or advertising</span>
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">3. How We Use Your Information</h3>
                <p className="mb-2">
                  We use collected information to:
                </p>
                <ul className="space-y-1.5 pl-1">
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Create and manage events</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Enable participation in event chats and media sharing</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Apply RSVP-based access rules</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Deliver notifications related to events</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Enforce fade-out and expiry behavior</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Provide user support</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Maintain app security and reliability</span>
                  </li>
                </ul>
                <p className="mt-3 font-semibold text-[#111827]">
                  FadeOut does not sell personal data
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">4. Guest Access</h3>
                <p className="mb-2">
                  FadeOut allows limited guest participation via invite links.
                </p>
                <p className="mb-2">
                  Guest users may:
                </p>
                <ul className="space-y-1.5 pl-1 mb-2.5">
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>View basic event details</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Submit an RSVP</span>
                  </li>
                </ul>
                <p className="mb-2">
                  Guest users cannot:
                </p>
                <ul className="space-y-1.5 pl-1 mb-2.5">
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Post messages</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Upload media</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Fully participate in event chats</span>
                  </li>
                </ul>
                <p>
                  Guest activity is limited and subject to the same privacy protections as logged-in users.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">5. Media, Messages, and Fade-Out</h3>
                <p className="mb-2">
                  Messages and photos shared within events are:
                </p>
                <ul className="space-y-1.5 pl-1 mb-2.5">
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Visible only to permitted participants</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Scoped strictly to the event</span>
                  </li>
                </ul>
                <p className="mb-2">
                  After an event expires:
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
                    <span>No new content can be added</span>
                  </li>
                </ul>
                <p className="mt-2">
                  FadeOut does not guarantee permanent storage of any content.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">6. Analytics</h3>
                <p className="mb-2">
                  FadeOut collects limited, aggregated analytics for internal use only.
                </p>
                <p className="mb-2">
                  For MVP, analytics are:
                </p>
                <ul className="space-y-1.5 pl-1 mb-2.5">
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Admin-only</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Count-based</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Not visible to users</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Not used for advertising</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Not shared with third parties for marketing</span>
                  </li>
                </ul>
                <p>
                  FadeOut does not track users across other apps or services.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">7. Data Sharing</h3>
                <p className="mb-2">
                  FadeOut shares data only when necessary to operate the service, including with:
                </p>
                <ul className="space-y-1.5 pl-1 mb-2.5">
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Cloud infrastructure providers</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Firebase/Google (for authentication and app services)</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Apple and Google services required for app distribution</span>
                  </li>
                </ul>
                <p>
                  We do not sell or rent personal data.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">8. Data Retention</h3>
                <p className="mb-2">
                  Data is retained only as long as necessary to:
                </p>
                <ul className="space-y-1.5 pl-1 mb-2.5">
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Provide the service</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Comply with legal obligations</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Resolve disputes</span>
                  </li>
                </ul>
                <p>
                  Event content may be removed or permanently deleted as part of fade-out behavior or system maintenance.
                </p>
              </div>

              {/* Section 9 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">9. Account Deletion</h3>
                <p className="mb-2">
                  Users may delete their account from within the app.
                </p>
                <p className="mb-2">
                  When an account is deleted:
                </p>
                <ul className="space-y-1.5 pl-1 mb-2.5">
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>The user is removed from all active events</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Past events remain visible to hosts in read-only form</span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Personal data is deleted or anonymized where reasonably possible</span>
                  </li>
                </ul>
                <p>
                  Hosts cannot delete their account while they have active events.
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">10. Security</h3>
                <p>
                  FadeOut uses reasonable technical and organizational measures to protect user data. However, no system is completely secure, and we cannot guarantee absolute security.
                </p>
              </div>

              {/* Section 11 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">11. Children’s Privacy</h3>
                <p>
                  FadeOut is intended for users aged 18 years and older. We do not knowingly collect data from children.
                </p>
              </div>

              {/* Section 12 */}
              <div>
                <h3 className="text-[13px] font-bold text-[#111827] mb-2">12. Changes to This Policy</h3>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be reflected with an updated “Last updated” date.
                </p>
              </div>

              {/* Contact Section */}
              <div className="pt-4 border-t border-[#E5E7EB]">
                <h3 className="text-[13px] font-bold text-[#111827] mb-1">13. Contact Us</h3>
                <p>
                  If you have questions or requests related to privacy, contact: <a href="mailto:support@fadeoutapp.com" className="font-bold text-[#111827] hover:text-primary transition-colors">support@fadeoutapp.com</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
