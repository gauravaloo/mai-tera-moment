import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Stars, CinematicOverlay } from "@/components/Atmosphere";
import { MagneticButton } from "@/components/Scene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mai Tera — for Nehuu ♡" },
      { name: "description", content: "A love story written in light, sirf Nehuu ke liye." },
    ],
  }),
  component: Intro,
});

const sequence = [
  { t: "Some dates are just dates…", d: 2200 },
  { t: "But some become feelings.", d: 2400 },
  { t: "May 13", d: 1800 },
];

function Intro() {
  const [step, setStep] = useState(0);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (step < sequence.length) {
      const t = setTimeout(() => setStep((s) => s + 1), sequence[step].d);
      return () => clearTimeout(t);
    } else if (!reveal) {
      const t = setTimeout(() => setReveal(true), 900);
      return () => clearTimeout(t);
    }
  }, [step, reveal]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, #1a0822 0%, #06030d 60%, #000 100%)",
        }}
      />
      <Stars count={140} />
      <CinematicOverlay />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {!reveal && step < sequence.length && (
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl md:text-5xl italic tracking-wide text-white/85 glow-text"
            >
              {sequence[step].t}
            </motion.p>
          )}
        </AnimatePresence>

        {reveal && <Reveal />}
      </div>
    </div>
  );
}

function Reveal() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const ts = [900, 900, 1200].map((d, i) =>
      setTimeout(() => setPhase(i + 1), [900, 1800, 3000][i])
    );
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-baseline gap-6 md:gap-12">
        <Morph from="May" to="Mai" active={phase >= 1} />
        <Morph from="13" to="Tera" active={phase >= 2} />
      </div>

      {phase >= 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center"
        >
          <h1 className="font-display text-7xl md:text-[10rem] font-bold leading-none glow-text"
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
          <span className="mt-2 text-5xl md:text-6xl animate-heartbeat">❤️</span>
          <p className="mt-6 font-script text-2xl md:text-3xl text-white/80">
            for Nehuu
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-12"
          >
            <MagneticButton to="/why" label="Enter Our Universe ✨" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function Morph({ from, to, active }: { from: string; to: string; active: boolean }) {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={active ? to : from}
          initial={{ opacity: 0, y: 20, filter: "blur(14px)", scale: 0.9 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(14px)", scale: 1.1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block font-display text-5xl md:text-8xl font-semibold glow-text"
          style={{ color: active ? "#ffd1e8" : "white" }}
        >
          {active ? to : from}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
