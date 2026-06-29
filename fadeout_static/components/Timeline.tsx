"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "./ui/SectionTitle";
import { TimelineStep } from "./ui/TimelineStep";

export function Timeline() {
  const steps = [
    {
      number: 1,
      title: "Create your event",
      description: "Set a name, date, and time. Your private space is ready instantly.",
      alignment: "left" as const,
    },
    {
      number: 2,
      title: "Share secure link",
      description: "Send a private invite link via text, WhatsApp, or social media.",
      alignment: "right" as const,
    },
    {
      number: 3,
      title: "Guests RSVP",
      description: "Friends join the space with one tap. No complex signups required.",
      alignment: "left" as const,
    },
    {
      number: 4,
      title: "Chat & Share",
      description: "During the event, everyone posts photos and chats in real-time.",
      alignment: "right" as const,
    },
    {
      number: 5,
      title: "Event fades",
      description: "Active interaction ends, leaving a beautiful archived memory vault.",
      alignment: "left" as const,
    },
  ];

  return (
    <section className="py-[120px] bg-light-bg w-full overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-6">
        {/* Section Title */}
        <SectionTitle
          title="How It Works"
          subtitle="Simple Process"
          description="FadeOut simplifies event memory capturing in 5 simple, automated steps."
        />

        {/* Timeline Container */}
        <div className="relative mt-20 max-w-5xl mx-auto flex flex-col gap-12 md:gap-16">
          {/* Animated Central Timeline Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[32px] md:left-1/2 top-8 bottom-8 w-[2px] bg-primary/20 origin-top -translate-x-[1px]"
          />

          {/* Steps */}
          {steps.map((step, index) => (
            <TimelineStep
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              alignment={step.alignment}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
