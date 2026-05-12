import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  bg: ReactNode;
  next?: { to: string; label: string };
  prev?: { to: string; label: string };
  textColor?: string;
};

export function Scene({ children, bg, next, prev, textColor = "text-white" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(20px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative min-h-screen w-full overflow-hidden ${textColor}`}
    >
      {bg}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
        {children}
        {(prev || next) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-4"
          >
            {prev && (
              <Link
                to={prev.to}
                className="magnetic-btn rounded-full glass px-6 py-3 text-sm tracking-wide opacity-80 hover:opacity-100"
              >
                ← {prev.label}
              </Link>
            )}
            {next && <MagneticButton to={next.to} label={next.label} />}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function MagneticButton({ to, label, onClick }: { to?: string; label: string; onClick?: () => void }) {
  const inner = (
    <motion.span
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      className="magnetic-btn relative inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-medium tracking-wider text-white glow-soft"
      style={{
        background:
          "linear-gradient(120deg, rgba(255,150,200,0.85), rgba(180,140,255,0.85), rgba(255,180,150,0.85))",
        backgroundSize: "200% 200%",
        animation: "bgShift 6s ease infinite",
      }}
    >
      {label}
    </motion.span>
  );
  if (to) return <Link to={to}>{inner}</Link>;
  return <button onClick={onClick}>{inner}</button>;
}