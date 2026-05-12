import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1600);
    const t2 = setTimeout(() => setPhase(2), 3200);
    const t3 = setTimeout(() => setDone(true), 4800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
        >
          {/* tiny stars */}
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.9, 0.3, 0.9] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                className="absolute h-[2px] w-[2px] rounded-full bg-white"
                style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
              />
            ))}
          </div>

          {/* glowing particle heart */}
          <motion.div
            animate={{ scale: [1, 1.18, 0.95, 1.1, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div
              className="text-7xl"
              style={{
                filter:
                  "drop-shadow(0 0 20px rgba(255,150,200,0.8)) drop-shadow(0 0 60px rgba(200,140,255,0.6))",
              }}
            >
              ❤️
            </div>
            {/* particles */}
            {Array.from({ length: 18 }).map((_, i) => {
              const a = (i / 18) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-[3px] w-[3px] rounded-full bg-pink-200"
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: Math.cos(a) * 70,
                    y: Math.sin(a) * 70,
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.07 }}
                  style={{ boxShadow: "0 0 8px #ffb6c1" }}
                />
              );
            })}
          </motion.div>

          <div className="mt-12 h-16 text-center">
            <AnimatePresence mode="wait">
              {phase === 0 && (
                <motion.p
                  key="a"
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  transition={{ duration: 0.8 }}
                  className="font-display text-xl md:text-2xl italic text-white/85"
                  style={{ textShadow: "0 0 20px rgba(255,180,210,0.5)" }}
                >
                  Building something special for Nehuu…
                </motion.p>
              )}
              {phase === 1 && (
                <motion.p
                  key="b"
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  transition={{ duration: 0.8 }}
                  className="font-display text-xl md:text-2xl italic text-white/85"
                  style={{ textShadow: "0 0 20px rgba(255,180,210,0.5)" }}
                >
                  Some feelings deserve more than words.
                </motion.p>
              )}
              {phase === 2 && (
                <motion.p
                  key="c"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.9 }}
                  className="font-script text-3xl md:text-4xl text-pink-200 glow-text"
                >
                  ♡
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
