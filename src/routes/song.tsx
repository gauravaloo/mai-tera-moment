import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/song")({
  head: () => ({
    meta: [
      { title: "Mai Tera Mai Tera — sun le" },
      { name: "description", content: "A song just for her." },
    ],
  }),
  component: SongPage,
});

// Start at the "mai tera mai tera" hook
const VIDEO_ID = "goeit4-XJ70";
const START_SEC = 60;

function SongPage() {
  const [playing, setPlaying] = useState(false);
  return (
    <PageShell gradient="bg-gradient-romance" prev={{ to: "/promise", label: "Pichla" }}>
      <p className="font-script text-3xl text-white drop-shadow-lg animate-fade-in">
        aur ek aakhri baat...
      </p>
      <h2 className="mt-3 font-display text-5xl md:text-7xl font-bold text-white drop-shadow-2xl animate-fade-up">
        Yeh gaana, sirf tere liye.
      </h2>
      <p className="mt-6 max-w-xl font-display text-xl md:text-2xl italic text-white/95 animate-fade-up" style={{ animationDelay: '.2s' }}>
        Jab bhi yeh sune, yaad rakhna —
        <br />
        <span className="font-script text-3xl">"Mai tera, mai tera..."</span> matlab sirf TU.
      </p>

      {!playing ? (
        <button
          onClick={() => setPlaying(true)}
          className="group mt-12 relative inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg font-semibold text-white shadow-romance hover-lift animate-heartbeat"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.22 10), oklch(0.55 0.22 340), oklch(0.75 0.18 50))",
          }}
        >
          <span className="text-2xl">▶</span>
          Play "Mai Tera"
          <span className="text-2xl">♥</span>
        </button>
      ) : (
        <div className="mt-12 w-full max-w-2xl overflow-hidden rounded-3xl border-4 border-white/60 shadow-romance animate-fade-up">
          <div className="relative aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&start=${START_SEC}&rel=0`}
              title="Mai Tera"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <p className="mt-14 font-script text-4xl text-white drop-shadow-lg animate-fade-in">
        Happy 13 May, meri jaan ♡
      </p>
      <p className="mt-2 font-display text-lg italic text-white/90">
        — sirf tera
      </p>
    </PageShell>
  );
}