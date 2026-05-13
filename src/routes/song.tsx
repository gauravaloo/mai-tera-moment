import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Aurora, Stars, Petals, CinematicOverlay } from "@/components/Atmosphere";
import { Scene, MagneticButton } from "@/components/Scene";

export const Route = createFileRoute("/song")({
  head: () => ({
    meta: [{ title: "Mai Tera · for Nehuu ❤️" }],
  }),
  component: SongPage,
});

const VIDEO_ID = "Grr0FlC8SQA";
// 3:47 = 227 seconds
const START_SEC = 227;

const letterLines: string[] = [
  "Tomorrow is May 13… 'Mai Tera.'",
  "And sach bolu, that's exactly how I feel about you.",
  "Har din I'm trying to become better for you, fixing myself little by little, learning how to love you the way you truly deserve, because I genuinely want you in my life for a long time.",
  "You're honestly my peace · the one person jisse baat karke everything feels lighter without even trying.",
  "What I want from us is simple… better communication, choti choti conversations, knowing how your day went, what's on your mind, how you're feeling, even the random silly things.",
  "I never want us to stop sharing parts of our day with each other.",
  "And maybe when I randomly ask 'kya kar rahi ho?' or 'how was your day?'… it's only because your little updates somehow become the best part of mine.",
  "May 13… 'Mai Tera.'",
  "Funny how a date can sound so simple, yet hold something that feels this real.",
];

function SongPage() {
  const [open, setOpen] = useState(false);
  return (
    <Scene
      bg={
        <>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg,#0a0420,#2a0a3a,#5a1f5e,#ff7eb6)" }}
          />
          <Aurora variant="purple" />
          <Stars count={70} />
          <Petals count={26} emoji="🌹" />
          <CinematicOverlay />
        </>
      }
      prev={{ to: "/buildup", label: "Pichla" }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-script text-3xl text-pink-100 glow-text"
      >
        Nehuu, ek aakhri baat…
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="mt-4 font-display text-4xl sm:text-5xl md:text-7xl font-bold glow-text"
      >
        A little love letter.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
        transition={{ duration: 1.4, delay: 0.5 }}
        className="glass glow-soft mt-10 w-full max-w-2xl rounded-3xl p-5 sm:p-8 md:p-12 text-left"
      >
        {letterLines.map((line, i) => {
          const isHighlight = line.startsWith("May 13") || line.startsWith("Tomorrow");
          return (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1, delay: 0.15 * i }}
              className={
                isHighlight
                  ? "mt-5 font-script text-xl sm:text-2xl md:text-3xl text-pink-200 glow-text"
                  : "mt-5 font-display text-base sm:text-lg md:text-xl italic leading-relaxed text-white/95"
              }
            >
              {line}
            </motion.p>
          );
        })}

        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-10 text-center font-display text-3xl sm:text-4xl md:text-6xl font-bold glow-text"
          style={{
            backgroundImage: "linear-gradient(120deg,#ffd1e8,#ffb6c1,#e9b8ff,#ffd6a5)",
            backgroundSize: "200% 200%",
            animation: "bgShift 6s ease infinite",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Mai Tera ❤️
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="mt-12"
      >
        <MagneticButton onClick={() => setOpen(true)} label="Play 🎶" />
      </motion.div>

      <AnimatePresence>{open && <SongModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </Scene>
  );
}

function SongModal({ onClose }: { onClose: () => void }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 600);
    return () => clearTimeout(t);
  }, []);

  const lyrics = ["Mai tera…", "Mai tera…", "sirf tera, Nehuu ❤️"];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" onClick={onClose} />
      <Aurora variant="purple" />
      <Stars count={80} />
      <Petals count={pulse ? 40 : 20} emoji="❤" />
      <CinematicOverlay />

      <motion.div
        initial={{ scale: 0.7, opacity: 0, filter: "blur(30px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0)" }}
        exit={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[92%] max-w-3xl"
      >
        <div className="glass glow-soft overflow-hidden rounded-3xl border border-white/30">
          <div className="relative aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&start=${START_SEC}&rel=0&modestbranding=1`}
              title="Mai Tera"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </div>

        <motion.p
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="mt-8 text-center font-display text-3xl sm:text-4xl md:text-6xl font-bold glow-text"
          style={{
            backgroundImage: "linear-gradient(120deg,#ffd1e8,#ffb6c1,#e9b8ff,#ffd6a5)",
            backgroundSize: "200% 200%",
            animation: "bgShift 6s ease infinite",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Mai Tera ❤️
        </motion.p>

        <div className="mt-6 flex flex-col items-center gap-3">
          {lyrics.map((l, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{
                opacity: [0, 1, 1, 0.7],
                y: [20, 0, 0, -10],
                filter: ["blur(10px)", "blur(0)", "blur(0)", "blur(4px)"],
              }}
              transition={{
                duration: 4,
                delay: 1 + i * 1.4,
                repeat: Infinity,
                repeatDelay: 4,
              }}
              className="font-script text-2xl sm:text-3xl md:text-5xl text-pink-100 glow-text text-center px-4"
            >
              {l}
            </motion.p>
          ))}
        </div>

        <button
          onClick={onClose}
          className="magnetic-btn mx-auto mt-8 block rounded-full glass px-6 py-3 text-sm text-white/90"
        >
          close ✕
        </button>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,150,200,0.28), transparent 60%)",
        }}
      />
    </motion.div>
  );
}
