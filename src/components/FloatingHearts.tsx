export function FloatingHearts() {
  const hearts = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {hearts.map((_, i) => {
        const left = (i * 7.3) % 100;
        const delay = (i * 0.7) % 6;
        const dur = 7 + (i % 5);
        const size = 14 + (i % 4) * 6;
        return (
          <span
            key={i}
            className="absolute text-[color:var(--rose)] opacity-60 animate-float"
            style={{
              left: `${left}%`,
              top: `${(i * 11) % 100}%`,
              fontSize: size,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
            }}
          >
            ♥
          </span>
        );
      })}
    </div>
  );
}