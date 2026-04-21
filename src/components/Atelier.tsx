import fabrics from "@/assets/fabrics.jpg";
import hands from "@/assets/hands-sewing.jpg";
import mannequin from "@/assets/mannequin.jpg";

export const Atelier = () => {
  return (
    <section id="atelier" className="py-32 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="eyebrow mb-6">L'Atelier</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8">
              Un savoir‑faire vivant, des gestes précis.
            </h2>
            <div className="hairline mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              Au cœur du Marais, notre atelier conjugue tradition et modernité.
              Tissus nobles, machines de précision et formateurs Meilleurs
              Ouvriers de France accompagnent chaque élève dans la maîtrise
              d'un métier d'art.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              De la coupe au montage, du patronnage à la finition main —
              chaque détail compte.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            <img
              src={fabrics}
              alt="Tissus précieux et broderies dorées"
              loading="lazy"
              width={1200}
              height={1200}
              className="w-full aspect-[4/5] object-cover shadow-soft"
            />
            <img
              src={mannequin}
              alt="Mannequin couture dans l'atelier parisien"
              loading="lazy"
              width={1200}
              height={1500}
              className="w-full aspect-[4/5] object-cover mt-12 shadow-soft"
            />
            <img
              src={hands}
              alt="Mains d'une couturière travaillant à l'aiguille"
              loading="lazy"
              width={1200}
              height={1200}
              className="col-span-2 w-full aspect-[16/9] object-cover shadow-soft"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
