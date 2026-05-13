import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Aurora, Petals, CinematicOverlay } from "@/components/Atmosphere";
import { Scene } from "@/components/Scene";

export const Route = createFileRoute("/why")({
  head: () => ({
    meta: [{ title: "Why You — Nehuu" }],
  }),
  component: Why,
});

const lines = [
  "Pata nahi kaise… but tum meri har normal day ko special bana deti ho.",
  "Tumhare messages literally mera mood change kar dete hain.",
  "Tum meri comfort place ho.",
  "Agar peace ka koi face hota… toh shayad woh tum hoti.",
  "Tumhare saath even silence bhi accha lagta hai.",
];

function Why() {
  return (
    <Scene
      bg={
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#2a0a3a,#5a1f5e,#ff7eb6)" }} />
          <Aurora variant="rose" />
          <Petals count={20} emoji="♥" />
          <CinematicOverlay />
        </>
      }
      prev={{ to: "/", label: "Wapas" }}
      next={{ to: "/little-things", label: "There's More ❤️" }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-script text-3xl text-pink-100/90 glow-text"
      >
        Nehuu, ek baat sun…
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="mt-4 font-display text-4xl sm:text-5xl md:text-7xl font-bold glow-text"
      >
        Why <em className="italic">you</em>?
      </motion.h2>

      <div className="mt-12 grid w-full gap-4 sm:gap-5 md:grid-cols-2">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.15 * i }}
            whileHover={{ scale: 1.03, rotate: -0.5 }}
            className="glass glow-soft rounded-3xl p-5 sm:p-7 text-left"
          >
            <WordReveal text={l} />
          </motion.div>
        ))}
      </div>
    </Scene>
  );
}

function WordReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <p className="font-display text-lg sm:text-xl md:text-2xl italic leading-relaxed text-white">
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.04 }}
          className="inline-block mr-1.5"
        >
          {w}
        </motion.span>
      ))}
    </p>
  );
}
