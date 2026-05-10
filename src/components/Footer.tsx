export const Footer = () => (
  <footer className="bg-noir text-background/70 py-16" style={{ background: "hsl(var(--noir))" }}>
    <div className="container grid md:grid-cols-3 gap-10 text-sm">
      <div>
        <p className="font-display text-xl text-background mb-2">Maison Véline</p>
        <p className="eyebrow text-gold">Haute Couture · École</p>
        <p className="mt-4 text-background/60">
          Atelier fondé en 1962 par Hélène Véline.
        </p>
      </div>
      <div>
        <p className="eyebrow text-background/80 mb-3">Atelier</p>
        <p>14 rue des Francs‑Bourgeois</p>
        <p>75004 Paris</p>
        <p className="mt-2">Lun – Sam · 10h – 19h</p>
      </div>
      <div>
        <p className="eyebrow text-background/80 mb-3">Contact</p>
        <p>maison-veline5@gmail.com</p>
        <p>+33 1 42 78 34 56</p>
      </div>
    </div>
    <div className="container mt-12 pt-8 border-t border-background/10 text-xs text-background/40 flex justify-between">
      <span>© {new Date().getFullYear()} Maison Véline</span>
      <span>Paris · Made with care</span>
    </div>
  </footer>
);
