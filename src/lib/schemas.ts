import { z } from "zod";

export const studentSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(80, "Maximum 80 caractères"),
  last_name: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(80, "Maximum 80 caractères"),
  email: z
    .string()
    .trim()
    .email("Adresse email invalide")
    .max(255),
  phone: z
    .string()
    .trim()
    .min(6, "Numéro trop court")
    .max(30, "Numéro trop long")
    .regex(/^[+0-9 .()-]+$/, "Numéro invalide"),
  level: z.enum(["debutant", "intermediaire", "expert"] as const, {
    errorMap: () => ({ message: "Veuillez choisir un niveau" }),
  }),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
