import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Aurora, Petals, CinematicOverlay } from "@/components/Atmosphere";
import { Scene } from "@/components/Scene";

export const Route = createFileRoute("/little-things")({
  head: () => ({ meta: [{ title: "Little Things · Nehuu" }] }),
  component: LittleThings,
});

const cards = [
  { t: "Your smile = instant peace.", e: "🌸" },
  { t: "Your voice > every playlist.", e: "🎧" },
  { t: "Tumhari attention literally healing hai.", e: "✨" },
  { t: "Every song feels softer when I think about you.", e: "🎵" },
  { t: "You somehow became my favourite notification.", e: "💌" },
  { t: "Tumhari hasi mere din ka best part hai.", e: "🌷" },
];

function LittleThings() {
  return (
    <Scene
      bg={
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#1a1840,#5b3a8c,#ffb8d9)" }} />
          <Aurora variant="purple" />
          <Petals count={22} emoji="🌸" />
          <CinematicOverlay />
        </>
      }
      prev={{ to: "/why", label: "Pichla" }}
      next={{ to: "/buildup", label: "One More Thing ✨" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
        transition={{ duration: 1.2 }}
        className="font-display text-4xl sm:text-5xl md:text-7xl font-bold glow-text"
      >
        Little things,
        <br />
        <span className="font-script text-pink-100">badi feelings.</span>
      </motion.h2>
      <p className="mt-4 max-w-xl font-display text-base sm:text-lg italic text-white/80 px-2">
        Nehuu, yeh chhoti chhoti baatein hain · par mere liye sab kuch hain.
      </p>

      <div className="mt-12 grid w-full gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <TiltCard key={i} delay={i * 0.08}>
            <div className="text-3xl">{c.e}</div>
            <p className="mt-3 font-display text-base sm:text-lg italic leading-snug text-white">
              {c.t}
            </p>
          </TiltCard>
        ))}
      </div>
    </Scene>
  );
}

function TiltCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 12}deg) translateZ(0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay }}
      className="glass glow-soft animate-float rounded-3xl p-6 text-left transition-transform duration-300"
      style={{ animationDelay: `${delay * 2}s` }}
    >
      {children}
    </motion.div>
  );
}
