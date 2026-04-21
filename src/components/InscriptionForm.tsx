import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, type StudentFormValues } from "@/lib/schemas";
import { createStudent } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";

const levels: { value: StudentFormValues["level"]; label: string; hint: string }[] = [
  { value: "debutant", label: "Débutant", hint: "Premiers points" },
  { value: "intermediaire", label: "Intermédiaire", hint: "Maîtrise du vêtement" },
  { value: "expert", label: "Expert", hint: "Atelier signature" },
];

export const InscriptionForm = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: { level: undefined as unknown as StudentFormValues["level"] },
  });

  const selectedLevel = watch("level");

  const onSubmit = async (values: StudentFormValues) => {
    try {
      await createStudent(values);
      toast({
        title: "Candidature reçue",
        description: "Notre équipe vous contactera sous 48h.",
      });
      reset();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (e) {
      toast({
        title: "Inscription impossible",
        description: e instanceof Error ? e.message : "Erreur inattendue.",
        variant: "destructive",
      });
    }
  };

  const inputCls =
    "w-full bg-transparent border-0 border-b border-border focus:border-gold focus:outline-none focus:ring-0 py-3 text-base placeholder:text-muted-foreground/60 transition-colors";

  return (
    <section id="inscription" className="py-32 bg-secondary/40">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Candidature</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Rejoignez la <em className="gradient-gold-text not-italic">Maison</em>
          </h2>
          <div className="hairline max-w-xs mx-auto mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            Promotion limitée à 18 élèves par niveau. Toutes les candidatures sont étudiées par notre comité pédagogique.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-background border border-border p-8 md:p-12 shadow-elegant">
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
            <div>
              <label htmlFor="first_name" className="eyebrow block mb-2">Prénom</label>
              <input id="first_name" {...register("first_name")} className={inputCls} placeholder="Camille" />
              {errors.first_name && <p className="text-destructive text-xs mt-2">{errors.first_name.message}</p>}
            </div>
            <div>
              <label htmlFor="last_name" className="eyebrow block mb-2">Nom</label>
              <input id="last_name" {...register("last_name")} className={inputCls} placeholder="Véline" />
              {errors.last_name && <p className="text-destructive text-xs mt-2">{errors.last_name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="eyebrow block mb-2">Email</label>
              <input id="email" type="email" {...register("email")} className={inputCls} placeholder="camille@maison.fr" />
              {errors.email && <p className="text-destructive text-xs mt-2">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="eyebrow block mb-2">Téléphone</label>
              <input id="phone" {...register("phone")} className={inputCls} placeholder="+33 6 12 34 56 78" />
              {errors.phone && <p className="text-destructive text-xs mt-2">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="mt-12">
            <p className="eyebrow mb-4">Niveau souhaité</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {levels.map((l) => {
                const active = selectedLevel === l.value;
                return (
                  <button
                    type="button"
                    key={l.value}
                    onClick={() => setValue("level", l.value, { shouldValidate: true })}
                    className={cn(
                      "text-left p-5 border transition-all",
                      active
                        ? "border-gold bg-gold/10"
                        : "border-border hover:border-foreground/40"
                    )}
                  >
                    <p className={cn("font-display text-lg mb-1", active && "text-gold")}>
                      {l.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{l.hint}</p>
                  </button>
                );
              })}
            </div>
            {errors.level && <p className="text-destructive text-xs mt-2">{errors.level.message}</p>}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="text-xs text-muted-foreground max-w-sm">
              En soumettant ce formulaire, vous acceptez d'être recontacté(e) par la Maison Véline concernant votre candidature.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background text-sm uppercase tracking-[0.25em] hover:bg-gold hover:text-foreground transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Envoi…" : submitted ? "✓ Envoyée" : "Envoyer ma candidature"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
