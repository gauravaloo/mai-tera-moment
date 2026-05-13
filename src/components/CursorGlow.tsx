import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    // disable on touch / small screens — saves a ton of repaints on mobile
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    let nx = -200;
    let ny = -200;
    const onMove = (e: MouseEvent) => {
      nx = e.clientX;
      ny = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          setPos({ x: nx, y: ny });
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
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
    </>
  );
}