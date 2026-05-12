import { Link } from "@tanstack/react-router";
import { FloatingHearts } from "./FloatingHearts";

type Props = {
  children: React.ReactNode;
  gradient?: string;
  next?: { to: string; label: string };
  prev?: { to: string; label: string };
};

export function PageShell({ children, gradient = "bg-gradient-romance", next, prev }: Props) {
  return (
    <div className={`relative min-h-screen w-full ${gradient} animate-bg-shift overflow-hidden`}>
      <FloatingHearts />
      <main className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        {children}
        <nav className="mt-14 flex flex-wrap items-center justify-center gap-4 animate-fade-in">
          {prev && (
            <Link
              to={prev.to}
              className="hover-lift rounded-full border border-[color:var(--rose)]/40 bg-white/40 px-6 py-3 text-sm font-medium text-[color:var(--plum)] backdrop-blur-md shadow-soft"
            >
              ← {prev.label}
            </Link>
          )}
          {next && (
            <Link
              to={next.to}
              className="hover-lift rounded-full bg-gradient-to-r from-[color:var(--rose)] to-[color:var(--plum)] px-7 py-3 text-sm font-semibold text-white shadow-romance animate-shimmer"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, oklch(0.65 0.22 10), oklch(0.55 0.22 340), oklch(0.65 0.22 10))",
              }}
            >
              {next.label} →
            </Link>
          )}
        </nav>
      </main>
    </div>
  );
}