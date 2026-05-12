import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Aurora, Stars, Petals, CinematicOverlay } from "@/components/Atmosphere";
import { Scene } from "@/components/Scene";

export const Route = createFileRoute("/buildup")({
  head: () => ({ meta: [{ title: "Mai Tera — the realization" }] }),
  component: Buildup,
});

const seq = [
  "I tried finding words…",
  "But feelings become different around you.",
  "Then I realized…",
  "Maybe…",
  "Just maybe…",
  "May 13…",
  "Was always meant to say…",
];

function Buildup() {
  const [step, setStep] = useState(0);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (step < seq.length) {
      const t = setTimeout(() => setStep((s) => s + 1), step < 2 ? 2200 : 1500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setReveal(true), 800);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <Scene
      bg={
        <>
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 60%, #2a0a3a 0%, #1a0822 50%, #06030d 100%)" }}
          />
          <Aurora variant="midnight" />
          <Stars count={120} />
          <Petals count={14} emoji="✦" />
          <CinematicOverlay />
        </>
      }
      prev={{ to: "/little-things", label: "Pichla" }}
      next={reveal ? { to: "/song", label: "Final Surprise 🎶" } : undefined}
    >
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!reveal && step < seq.length && (
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 30, filter: "blur(14px)", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)", scale: 1 }}
              exit={{ opacity: 0, y: -30, filter: "blur(14px)", scale: 1.05 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl md:text-5xl italic text-white/90 glow-text"
            >
              {seq[step]}
            </motion.p>
          )}

          {reveal && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.4, filter: "blur(40px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0)" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <h1
                className="font-display text-7xl md:text-[10rem] font-bold leading-none glow-text"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg,#ffd1e8,#ffb6c1,#e9b8ff,#ffd6a5)",
                  backgroundSize: "200% 200%",
                  animation: "bgShift 6s ease infinite",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Mai Tera
              </h1>
              <motion.span
                animate={{ scale: [1, 1.2, 0.95, 1.1, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="mt-3 text-6xl"
              >
                ❤️
              </motion.span>
              <p className="mt-6 font-script text-2xl text-pink-100/90">
                Nehuu, sirf tu.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  );
}
