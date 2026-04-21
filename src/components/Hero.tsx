import hero from "@/assets/hero-atelier.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Atelier de haute couture avec machine à coudre vintage"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 pt-24">
        <div className="max-w-2xl animate-fade-up">
          <p className="eyebrow mb-6">Depuis 1962 · Paris</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
            L'art de la <em className="gradient-gold-text not-italic">couture</em>,
            <br /> transmis avec exigence.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
            La Maison Véline ouvre les portes de son atelier à celles et ceux
            qui souhaitent apprendre la couture d'exception — du premier point
            jusqu'à la pièce signature.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#inscription"
              className="inline-flex items-center px-8 py-4 bg-foreground text-background text-sm uppercase tracking-[0.25em] hover:bg-gold hover:text-foreground transition-colors"
            >
              Rejoindre une formation
            </a>
            <a
              href="#formations"
              className="inline-flex items-center px-8 py-4 border border-foreground/30 text-sm uppercase tracking-[0.25em] hover:border-gold hover:text-gold transition-colors"
            >
              Découvrir les cours
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text-muted-foreground animate-fade-in">
        ↓ Faites défiler
      </div>
    </section>
  );
};
