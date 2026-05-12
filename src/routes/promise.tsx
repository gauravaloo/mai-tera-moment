import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/promise")({
  head: () => ({
    meta: [
      { title: "Mera Vaada — Mai Tera" },
      { name: "description", content: "A promise written in Hinglish." },
    ],
  }),
  component: Promise_,
});

function Promise_() {
  const promises = [
    { e: "🌧️", t: "Har baarish mein bhigne ko, tere saath." },
    { e: "☕", t: "Har subah ki chai, teri muskaan ke saath." },
    { e: "🌙", t: "Har raat ek lambi baat, sirf tere saath." },
    { e: "🌹", t: "Har mood mein, har roop mein — bas tera saath." },
  ];
  return (
    <PageShell
      gradient="bg-gradient-flame"
      prev={{ to: "/letter", label: "Pichla" }}
      next={{ to: "/song", label: "Ab sun gaana" }}
    >
      <h2 className="font-display text-5xl md:text-7xl font-bold text-gradient animate-fade-up">
        Mera Vaada
      </h2>
      <p className="mt-4 font-script text-2xl text-[color:var(--plum)] animate-fade-in">
        chaar choti baatein, ek badi kasam
      </p>
      <ul className="mt-12 grid w-full gap-4 sm:grid-cols-2">
        {promises.map((p, i) => (
          <li
            key={i}
            className="hover-lift rounded-2xl border border-white/60 bg-white/40 px-6 py-5 text-left backdrop-blur-md shadow-soft animate-fade-up"
            style={{ animationDelay: `${0.15 * i}s` }}
          >
            <div className="text-3xl">{p.e}</div>
            <p className="mt-2 font-display text-xl italic text-[color:var(--plum)]">
              {p.t}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-12 font-display text-2xl italic text-[color:var(--plum)] animate-fade-up">
        Tu rahe na rahe paas, dil mein bas tu hi hai.
      </p>
    </PageShell>
  );
}