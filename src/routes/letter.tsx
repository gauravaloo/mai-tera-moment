import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/letter")({
  head: () => ({
    meta: [
      { title: "Ek chhoti si baat — Mai Tera" },
      { name: "description", content: "Hinglish love letter for her." },
    ],
  }),
  component: Letter,
});

function Letter() {
  const lines = [
    "Subah ki pehli kiran se lekar raat ke aakhri sapne tak,",
    "har lamha tera naam le ke guzarta hai.",
    "Tu hasi hai meri, tu sukoon hai mera —",
    "tu woh kavita hai jo zubaan pe nahi, dil pe likhi hai.",
  ];
  return (
    <PageShell
      gradient="bg-gradient-dreamy"
      prev={{ to: "/", label: "Wapas" }}
      next={{ to: "/promise", label: "Aur sun" }}
    >
      <p className="font-script text-3xl text-[color:var(--plum)] animate-fade-in">
        Meri jaan,
      </p>
      <div className="mt-8 space-y-5 max-w-2xl">
        {lines.map((l, i) => (
          <p
            key={i}
            className="font-display text-2xl md:text-3xl italic text-[color:var(--plum)] animate-fade-up"
            style={{ animationDelay: `${0.2 + i * 0.25}s` }}
          >
            {l}
          </p>
        ))}
      </div>
      <div className="mt-12 inline-block rounded-3xl bg-white/50 backdrop-blur-md px-8 py-6 shadow-soft hover-lift">
        <p className="font-script text-3xl text-[color:var(--rose)]">
          Tu meri favourite feeling hai. ♡
        </p>
      </div>
    </PageShell>
  );
}