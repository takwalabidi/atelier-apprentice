import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { listStudents, deleteStudent, type Student, type Level } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const levelLabel: Record<Level, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  expert: "Expert",
};

const Admin = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"tous" | Level>("tous");

  const load = async () => {
    setLoading(true);
    try {
      setStudents(await listStudents());
    } catch (e) {
      toast({ title: "Erreur", description: e instanceof Error ? e.message : "Chargement impossible", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      if (filter !== "tous" && s.level !== filter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        s.first_name.toLowerCase().includes(q) ||
        s.last_name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
      );
    });
  }, [students, query, filter]);

  const stats = useMemo(() => {
    return {
      total: students.length,
      debutant: students.filter((s) => s.level === "debutant").length,
      intermediaire: students.filter((s) => s.level === "intermediaire").length,
      expert: students.filter((s) => s.level === "expert").length,
    };
  }, [students]);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet élève ?")) return;
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      toast({ title: "Élève supprimé" });
    } catch (e) {
      toast({ title: "Erreur", description: e instanceof Error ? e.message : "Suppression impossible", variant: "destructive" });
    }
  };

  const filters: { v: "tous" | Level; label: string; n: number }[] = [
    { v: "tous", label: "Tous", n: stats.total },
    { v: "debutant", label: "Débutant", n: stats.debutant },
    { v: "intermediaire", label: "Intermédiaire", n: stats.intermediaire },
    { v: "expert", label: "Expert", n: stats.expert },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen bg-background">
        <div className="container">
          <header className="mb-12">
            <p className="eyebrow mb-4">Administration</p>
            <h1 className="font-display text-4xl md:text-5xl mb-4">Élèves inscrits</h1>
            <div className="hairline max-w-xs" />
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-10">
            {filters.map((f) => (
              <button
                key={f.v}
                onClick={() => setFilter(f.v)}
                className={cn(
                  "p-6 text-left bg-background transition-colors",
                  filter === f.v ? "bg-foreground text-background" : "hover:bg-secondary"
                )}
              >
                <p className="eyebrow opacity-70">{f.label}</p>
                <p className="font-display text-3xl mt-2">{f.n}</p>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6 border-b border-border">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher par nom, prénom, email…"
              className="flex-1 bg-transparent py-3 focus:outline-none text-sm"
            />
          </div>

          {loading ? (
            <p className="text-muted-foreground text-sm py-12 text-center">Chargement…</p>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-border">
              <p className="font-display text-2xl mb-2">Aucun élève</p>
              <p className="text-muted-foreground text-sm">
                Les candidatures soumises depuis la vitrine apparaîtront ici.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left bg-secondary/50">
                    <th className="eyebrow font-normal p-4">Élève</th>
                    <th className="eyebrow font-normal p-4">Contact</th>
                    <th className="eyebrow font-normal p-4">Niveau</th>
                    <th className="eyebrow font-normal p-4">Inscrit le</th>
                    <th className="eyebrow font-normal p-4 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <p className="font-display text-base">
                          {s.first_name} {s.last_name}
                        </p>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        <p>{s.email}</p>
                        <p className="text-xs">{s.phone}</p>
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider border border-gold/50 text-gold">
                          {levelLabel[s.level]}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground text-xs">
                        {new Date(s.created_at).toLocaleDateString("fr-FR", {
                          day: "2-digit", month: "long", year: "numeric",
                        })}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Admin;
