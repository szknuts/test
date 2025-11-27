"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ExperimentalPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);

  return (
    <div ref={containerRef} className="bg-black min-h-[300vh] text-white overflow-hidden selection:bg-red-600 selection:text-white">
      {/* Noise Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] font-black leading-none tracking-tighter mix-blend-difference"
          >
            THE ZONE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl font-mono text-red-600 tracking-[1em] mt-4 uppercase"
          >
            Extreme Focus
          </motion.p>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-red-600/20 rounded-full blur-[100px] animate-pulse" />
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <ParallaxText baseVelocity={-5}>UNLEASH YOUR POTENTIAL</ParallaxText>
          <ParallaxText baseVelocity={5}>BREAK YOUR LIMITS</ParallaxText>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-32">
            <Card title="SPEED" number="01" />
            <Card title="POWER" number="02" />
            <Card title="TECHNIQUE" number="03" />
            <Card title="SPIRIT" number="04" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="h-screen flex items-center justify-center bg-white text-black relative">
        <div className="text-center">
          <h2 className="text-[10vw] font-black tracking-tighter">KINDAI</h2>
          <p className="text-xl font-bold tracking-widest">BOXING CLUB</p>
        </div>
      </section>
    </div>
  );
}

function Card({ title, number }: { title: string; number: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="group relative h-[400px] border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col justify-between overflow-hidden hover:bg-red-600 transition-colors duration-500"
    >
      <span className="text-6xl font-black text-white/10 group-hover:text-white/30 transition-colors">{number}</span>
      <h3 className="text-5xl font-black tracking-tighter z-10 mix-blend-difference">{title}</h3>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

function ParallaxText({ children, baseVelocity = 100 }: { children: string; baseVelocity: number }) {
  const baseX = useSpring(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(0, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(scrollY, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useTransform(scrollY, (v) => {
    // Calculate scroll direction and velocity
    // This is a simplified version for brevity
    return v;
  });

  // Animation loop logic would go here for continuous scroll
  // For this demo, we'll keep it simple with CSS animation or basic transform

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div 
        className="text-[8vw] font-black uppercase tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.2)]"
        style={{ x }}
      >
        <span className="block mr-8 text-white/20">{children} {children} {children} {children}</span>
      </motion.div>
    </div>
  );
}

// Helper to wrap range
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}
