import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => setPhase(2), 3600);
    const t3 = setTimeout(() => setDone(true), 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // generate randomized stars only on the client to avoid SSR hydration mismatch
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        dur: 3 + Math.random() * 3,
        delay: Math.random() * 2,
        size: Math.random() < 0.15 ? 3 : Math.random() < 0.5 ? 2 : 1,
      })),
    [],
  );

  // orbiting petals around the heart
  const orbits = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        angle: (i / 24) * Math.PI * 2,
        radius: 90 + Math.random() * 30,
        size: 2 + Math.random() * 3,
        delay: i * 0.06,
      })),
    [],
  );

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(24px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden text-white"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, #15071f 0%, #08020f 55%, #000 100%)",
          }}
        >
          {/* aurora glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, rgba(255,150,200,0.18), transparent 55%), radial-gradient(circle at 70% 60%, rgba(180,140,255,0.18), transparent 55%)",
            }}
          />

          {/* tiny stars (client only) */}
          {mounted && (
            <div className="pointer-events-none absolute inset-0">
              {stars.map((s, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.95, 0.25, 0.95] }}
                  transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
                  className="absolute rounded-full bg-white"
                  style={{
                    top: `${s.top}%`,
                    left: `${s.left}%`,
                    height: s.size,
                    width: s.size,
                    boxShadow: "0 0 6px rgba(255,220,235,0.8)",
                  }}
                />
              ))}
            </div>
          )}

          {/* the heart composition */}
          <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
            {/* soft outer halo */}
            <motion.div
              className="absolute rounded-full"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 240,
                height: 240,
                background:
                  "radial-gradient(circle, rgba(255,170,210,0.35), rgba(180,140,255,0.18) 45%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            {/* inner ring */}
            <motion.div
              className="absolute rounded-full border"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              style={{
                width: 170,
                height: 170,
                borderColor: "rgba(255,200,225,0.25)",
                boxShadow: "0 0 30px rgba(255,180,210,0.25), inset 0 0 20px rgba(200,150,255,0.18)",
              }}
            />

            {/* orbiting particle petals (client only) */}
            {mounted &&
              orbits.map((o, i) => (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-full"
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0.4, 1, 0],
                    x: [
                      Math.cos(o.angle) * (o.radius * 0.4),
                      Math.cos(o.angle) * o.radius,
                      Math.cos(o.angle + 0.6) * o.radius,
                      Math.cos(o.angle + 1.2) * (o.radius * 1.1),
                    ],
                    y: [
                      Math.sin(o.angle) * (o.radius * 0.4),
                      Math.sin(o.angle) * o.radius,
                      Math.sin(o.angle + 0.6) * o.radius,
                      Math.sin(o.angle + 1.2) * (o.radius * 1.1),
                    ],
                  }}
                  transition={{
                    duration: 4 + (i % 5),
                    repeat: Infinity,
                    delay: o.delay,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: o.size,
                    height: o.size,
                    background:
                      i % 3 === 0
                        ? "rgba(255,220,235,0.95)"
                        : i % 3 === 1
                          ? "rgba(255,180,210,0.95)"
                          : "rgba(210,170,255,0.95)",
                    boxShadow: "0 0 8px currentColor",
                    color: "rgba(255,180,210,0.7)",
                    marginLeft: -o.size / 2,
                    marginTop: -o.size / 2,
                  }}
                />
              ))}

            {/* the heart itself — gradient SVG with breathing pulse */}
            <motion.div
              animate={{ scale: [1, 1.12, 0.97, 1.08, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
              style={{
                filter:
                  "drop-shadow(0 0 18px rgba(255,150,200,0.85)) drop-shadow(0 0 50px rgba(200,140,255,0.55))",
              }}
            >
              <svg width="110" height="100" viewBox="0 0 32 29" fill="none">
                <defs>
                  <linearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffd1e8" />
                    <stop offset="45%" stopColor="#ff8fb8" />
                    <stop offset="100%" stopColor="#c89bff" />
                  </linearGradient>
                  <radialGradient id="heartGlow" cx="0.5" cy="0.4" r="0.6">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </radialGradient>
                </defs>
                <path
                  d="M23.6 0c-2.9 0-5.5 1.6-7.6 4.1C13.9 1.6 11.3 0 8.4 0 3.8 0 0 3.8 0 8.4c0 7.7 9.4 14.5 16 20.6 6.6-6.1 16-12.9 16-20.6C32 3.8 28.2 0 23.6 0z"
                  fill="url(#heartGrad)"
                />
                <path
                  d="M23.6 0c-2.9 0-5.5 1.6-7.6 4.1C13.9 1.6 11.3 0 8.4 0 3.8 0 0 3.8 0 8.4c0 7.7 9.4 14.5 16 20.6 6.6-6.1 16-12.9 16-20.6C32 3.8 28.2 0 23.6 0z"
                  fill="url(#heartGlow)"
                />
              </svg>
            </motion.div>
          </div>

          {/* text */}
          <div className="mt-12 h-16 text-center">
            <AnimatePresence mode="wait">
              {phase === 0 && (
                <motion.p
                  key="a"
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  transition={{ duration: 1 }}
                  className="font-display text-xl md:text-2xl italic tracking-wide text-white/90"
                  style={{ textShadow: "0 0 22px rgba(255,180,210,0.55)" }}
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
                  transition={{ duration: 1 }}
                  className="font-display text-xl md:text-2xl italic tracking-wide text-white/90"
                  style={{ textShadow: "0 0 22px rgba(255,180,210,0.55)" }}
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
                  transition={{ duration: 1 }}
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
