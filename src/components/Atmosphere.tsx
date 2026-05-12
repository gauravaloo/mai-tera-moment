import { useMemo } from "react";

/** Twinkling stars layer */
export function Stars({ count = 80, color = "white" }: { count?: number; color?: string }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2 + 0.5,
        d: Math.random() * 4,
        dur: 2 + Math.random() * 4,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            background: color,
            boxShadow: `0 0 ${s.s * 4}px ${color}`,
            animation: `twinkle ${s.dur}s ease-in-out ${s.d}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Floating rose petals / hearts drifting upward */
export function Petals({ count = 18, emoji = "🌸" }: { count?: number; emoji?: string }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 100,
        size: 12 + Math.random() * 18,
        dur: 14 + Math.random() * 16,
        delay: -Math.random() * 20,
        opacity: 0.4 + Math.random() * 0.5,
      })),
    [count, emoji]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-40px]"
          style={{
            left: `${p.x}%`,
            fontSize: p.size,
            opacity: p.opacity,
            animation: `drift ${p.dur}s linear ${p.delay}s infinite`,
            filter: "drop-shadow(0 0 6px rgba(255,180,210,0.6))",
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

/** Aurora gradient blobs */
export function Aurora({ variant = "rose" }: { variant?: "rose" | "purple" | "sunset" | "midnight" }) {
  const palettes: Record<string, [string, string, string]> = {
    rose: ["#ffb8d9", "#c8a8ff", "#ffd6a5"],
    purple: ["#c8a8ff", "#7a5af8", "#ff6fb5"],
    sunset: ["#ff9a9e", "#fad0c4", "#fbc2eb"],
    midnight: ["#3a1c71", "#d76d77", "#ffaf7b"],
  };
  const [a, b, c] = palettes[variant];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-40 -left-40 h-[60vmax] w-[60vmax] rounded-full opacity-60 blur-3xl"
        style={{ background: a, animation: "auroraA 18s ease-in-out infinite" }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[55vmax] w-[55vmax] rounded-full opacity-60 blur-3xl"
        style={{ background: b, animation: "auroraB 22s ease-in-out infinite" }}
      />
      <div
        className="absolute -bottom-40 left-1/4 h-[50vmax] w-[50vmax] rounded-full opacity-60 blur-3xl"
        style={{ background: c, animation: "auroraC 26s ease-in-out infinite" }}
      />
      <style>{`
        @keyframes auroraA { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(8vw,6vh) scale(1.15);} }
        @keyframes auroraB { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-6vw,8vh) scale(1.1);} }
        @keyframes auroraC { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(4vw,-6vh) scale(1.2);} }
      `}</style>
    </div>
  );
}

/** Cinematic noise+vignette overlay */
export function CinematicOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </>
  );
}