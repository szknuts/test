"use client";

import { motion } from "framer-motion";

import type { Member } from "@/types";

type Props = {
  member: Member;
  onClick: () => void;
  variant?: "standard" | "wide";
};

export default function MemberCard({ member, onClick, variant = "standard" }: Props) {
  const isWide = variant === "wide";

  if (isWide) {
    // Special Role Card (Director, etc.) - Premium Dark Theme
    return (
      <motion.div
        whileHover={{ y: -5 }}
        onClick={onClick}
        className="group relative cursor-pointer bg-black border border-gray-800 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <div className="relative w-full md:w-2/5 aspect-[3/4] md:aspect-auto overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          </div>

          {/* Content Section */}
          <div className="relative flex-1 p-8 flex flex-col justify-center">
            {/* Decorative Lines */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold tracking-widest uppercase mb-2">
                {member.classification}
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1">
                {member.name}
              </h3>
              {member.position && (
                <p className="text-red-500 font-mono text-sm tracking-wider uppercase">
                  {member.position}
                </p>
              )}
            </div>

            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 font-medium">
              {member.bio || "No description available."}
            </p>

            <div className="mt-6 flex items-center gap-2 text-white text-xs font-bold tracking-widest group-hover:text-red-500 transition-colors">
              VIEW PROFILE <span className="text-lg">→</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Standard Member Card - Sharp & Minimal
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group relative cursor-pointer bg-white border-b-2 border-gray-200 hover:border-red-600 transition-colors duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" />
        
        {/* Position Badge */}
        {member.position && (
          <div className="absolute top-0 left-0 bg-black text-white text-xs font-bold px-3 py-1.5 tracking-widest">
            {member.position}
          </div>
        )}
      </div>

      {/* Info Container */}
      <div className="p-4 relative">
        <h3 className="text-xl font-black text-gray-900 tracking-tight group-hover:text-red-600 transition-colors">
          {member.name}
        </h3>
        
        {/* Corner Accent */}
        <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[10px] border-r-[10px] border-b-transparent border-r-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}
