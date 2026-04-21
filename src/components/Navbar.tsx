import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { href: "#atelier", label: "L'Atelier" },
  { href: "#formations", label: "Formations" },
  { href: "#inscription", label: "Inscription" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLanding = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled || !onLanding
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-wide">Maison Véline</span>
          <span className="eyebrow mt-1">Haute Couture · École</span>
        </Link>

        {onLanding && (
          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm tracking-wide text-foreground/80 hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}

        <Link
          to={onLanding ? "/admin" : "/"}
          className="text-xs uppercase tracking-[0.25em] border-b border-transparent hover:border-gold hover:text-gold transition-colors"
        >
          {onLanding ? "Administration" : "Retour vitrine"}
        </Link>
      </div>
    </header>
  );
};
