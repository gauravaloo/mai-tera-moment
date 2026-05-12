import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    let id = 0;
    let last = 0;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const now = performance.now();
      if (now - last > 90) {
        last = now;
        const newId = id++;
        setHearts((h) => [...h, { id: newId, x: e.clientX, y: e.clientY }].slice(-12));
        setTimeout(() => setHearts((h) => h.filter((p) => p.id !== newId)), 1200);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{
          left: pos.x,
          top: pos.y,
          background:
            "radial-gradient(circle, rgba(255,200,230,0.9), rgba(200,160,255,0.4) 50%, transparent 70%)",
          transition: "transform .15s ease-out",
        }}
      />
      <div
        className="pointer-events-none fixed z-[99] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{
          left: pos.x,
          top: pos.y,
          background:
            "radial-gradient(circle, rgba(255,180,210,0.18), transparent 60%)",
          transition: "left .25s ease-out, top .25s ease-out",
        }}
      />
      {hearts.map((h) => (
        <span
          key={h.id}
          className="pointer-events-none fixed z-[101] -translate-x-1/2 -translate-y-1/2 text-pink-300"
          style={{
            left: h.x,
            top: h.y,
            animation: "heartTrail 1.2s ease-out forwards",
            fontSize: 14,
          }}
        >
          ♥
        </span>
      ))}
      <style>{`
        @keyframes heartTrail {
          0% { opacity: 1; transform: translate(-50%,-50%) scale(0.6); }
          100% { opacity: 0; transform: translate(-50%,-150%) scale(1.4); }
        }
      `}</style>
    </>
  );
}