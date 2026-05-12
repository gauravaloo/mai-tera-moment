import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mai Tera — 13 May, sirf tere liye" },
      { name: "description", content: "Ek chhoti si love letter, sirf tumhare liye." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell gradient="bg-gradient-sunset" next={{ to: "/letter", label: "Ek baat sun" }}>
      <p className="font-script text-2xl text-[color:var(--plum)] animate-fade-in">
        13 May · sirf tere liye ♡
      </p>
      <h1 className="mt-4 font-display text-6xl md:text-8xl font-bold text-gradient animate-fade-up">
        Mai Tera,
        <br />
        Tu Meri.
      </h1>
      <p className="mt-8 max-w-xl font-display text-xl md:text-2xl italic text-[color:var(--plum)]/90 animate-fade-up" style={{ animationDelay: '.3s' }}>
        Iss duniya ki har bheed mein, meri nazar bas tujhe dhoondhti hai.
        Aaj ek chhoti si kahaani likhi hai — sirf tere liye.
      </p>
      <div className="mt-10 text-5xl animate-heartbeat">♥</div>
    </PageShell>
  );
}
