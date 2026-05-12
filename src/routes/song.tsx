import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Aurora, Stars, Petals, CinematicOverlay } from "@/components/Atmosphere";
import { Scene, MagneticButton } from "@/components/Scene";

export const Route = createFileRoute("/song")({
  head: () => ({
    meta: [{ title: "Mai Tera Mai Tera — for Nehuu" }],
  }),
  component: SongPage,
});

const VIDEO_ID = "goeit4-XJ70";
// Hook "Mai tera, mai tera" begins around the chorus
const START_SEC = 60;

function SongPage() {
  const [open, setOpen] = useState(false);
  return (
    <Scene
      bg={
        <>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg,#1a0a3a,#5a1f5e,#ff7eb6,#ffd6a5)" }}
          />
          <Aurora variant="purple" />
          <Stars count={100} />
          <Petals count={22} emoji="🌹" />
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
        className="mt-4 font-display text-5xl md:text-7xl font-bold glow-text"
      >
        A little love letter.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
        transition={{ duration: 1.4, delay: 0.6 }}
        className="glass glow-soft mt-12 max-w-2xl rounded-3xl p-8 md:p-12 text-left"
      >
        <p className="font-display text-xl md:text-2xl italic leading-relaxed text-white">
          Shayad words kabhi enough nahi honge…
          <br />
          but if there's one thing I know for sure,
          <br />
          it's that every version of my happiness
          <br />
          somehow leads to <span className="font-script text-pink-200">tum</span>.
        </p>
        <p className="mt-6 font-display text-xl md:text-2xl italic leading-relaxed text-white">
          Aur shayad isiliye…
          <br />
          May 13 sirf ek date nahi lagti.
        </p>
        <p className="mt-6 font-display text-xl md:text-2xl italic leading-relaxed text-white">
          It feels like the universe quietly saying…
        </p>
        <p
          className="mt-6 text-center font-display text-4xl md:text-6xl font-bold glow-text"
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
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="mt-12"
      >
        <MagneticButton onClick={() => setOpen(true)} label="Play Our Moment 🎶" />
      </motion.div>

      <AnimatePresence>{open && <SongModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </Scene>
  );
}

function SongModal({ onClose }: { onClose: () => void }) {
  // pulsing hearts that intensify
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
      <Stars count={140} />
      <Petals count={pulse ? 36 : 18} emoji="❤" />
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

        <div className="mt-8 flex flex-col items-center gap-3">
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
              className="font-script text-3xl md:text-5xl text-pink-100 glow-text"
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

      {/* heartbeat glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,150,200,0.25), transparent 60%)",
        }}
      />
    </motion.div>
  );
}
