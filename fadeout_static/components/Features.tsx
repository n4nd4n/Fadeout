"use client";

import React from "react";
import { Calendar, MessageSquare, Image as ImageIcon } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";
import { FeatureCard } from "./ui/FeatureCard";

export function Features() {
  const featuresList = [
    {
      icon: Calendar,
      title: "Temporary Spaces",
      description:
        "Exclusive spaces created for the duration of your event. They appear when you need them and archive gracefully when you don't.",
    },
    {
      icon: MessageSquare,
      title: "Private Conversations",
      description:
        "Encrypted real-time chat for you and your guests. Share updates, jokes, and directions without external interference.",
    },
    {
      icon: ImageIcon,
      title: "Shared Event Gallery",
      description:
        "A collective high-resolution photo pool where everyone's perspective is captured in one beautiful shared timeline.",
    },
  ];

  return (
    <section id="about" className="py-[120px] bg-white w-full">
      <div className="w-full max-w-[1280px] mx-auto px-6">
        {/* Section Title */}
        <SectionTitle
          title="What FadeOut Does"
          subtitle="Core Features"
          description="Discover the unique features designed to make your private gatherings feel safe, intimate, and effortlessly memorable."
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {featuresList.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
