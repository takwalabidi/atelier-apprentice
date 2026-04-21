const formations = [
  {
    num: "01",
    level: "Débutant",
    title: "Premiers points",
    duration: "12 semaines",
    desc: "Découverte de la machine, points fondamentaux, lecture d'un patron simple. Réalisation d'une jupe et d'un chemisier.",
    skills: ["Machine & main", "Patron commercial", "Finitions de base"],
  },
  {
    num: "02",
    level: "Intermédiaire",
    title: "Maîtrise du vêtement",
    duration: "24 semaines",
    desc: "Patronnage à plat, transformations, montage d'une robe doublée et d'une veste structurée. Choix des tissus.",
    skills: ["Patronnage", "Doublures", "Veste tailleur"],
  },
  {
    num: "03",
    level: "Expert",
    title: "Atelier signature",
    duration: "36 semaines",
    desc: "Modélisme couture, drapé sur mannequin, broderie main, réalisation d'une pièce de collection présentée en défilé.",
    skills: ["Drapé", "Broderie main", "Pièce signature"],
  },
];

export const Formations = () => {
  return (
    <section id="formations" className="py-32 bg-noir text-background relative overflow-hidden" style={{ background: "hsl(var(--noir))" }}>
      <div className="container">
        <div className="max-w-2xl mb-20">
          <p className="eyebrow mb-6 text-gold">Nos formations</p>
          <h2 className="font-display text-4xl md:text-5xl text-background leading-tight">
            Trois parcours,
            <br />
            <em className="gradient-gold-text not-italic">une exigence.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border/20">
          {formations.map((f) => (
            <article
              key={f.num}
              className="group relative p-10 bg-noir hover:bg-foreground/5 transition-colors duration-700"
              style={{ background: "hsl(var(--noir))" }}
            >
              <div className="flex items-baseline justify-between mb-10">
                <span className="font-display text-5xl text-gold/70">{f.num}</span>
                <span className="text-xs uppercase tracking-[0.25em] text-background/60">
                  {f.duration}
                </span>
              </div>
              <p className="eyebrow text-gold mb-3">{f.level}</p>
              <h3 className="font-display text-2xl text-background mb-4">
                {f.title}
              </h3>
              <p className="text-background/70 text-sm leading-relaxed mb-8">
                {f.desc}
              </p>
              <ul className="space-y-2 border-t border-background/10 pt-6">
                {f.skills.map((s) => (
                  <li key={s} className="text-xs text-background/60 flex items-center gap-3">
                    <span className="h-px w-4 bg-gold" />
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#inscription"
            className="inline-flex items-center px-8 py-4 border border-gold/60 text-gold text-sm uppercase tracking-[0.25em] hover:bg-gold hover:text-foreground transition-colors"
          >
            Postuler à une formation
          </a>
        </div>
      </div>
    </section>
  );
};
