/**
 * API Client — DRF (Django Rest Framework) ready
 * ------------------------------------------------
 * Toutes les requêtes passent par ce client. Pour brancher Django :
 *  1. Définir VITE_API_URL=https://votre-backend.com/api dans .env
 *  2. Côté Django, exposer les endpoints DRF :
 *       GET/POST     /api/students/
 *       GET/PATCH/DELETE /api/students/:id/
 *       GET/POST     /api/courses/
 *       GET/POST     /api/instructors/
 *  3. Activer CORS (django-cors-headers) pour l'origine du frontend.
 *
 * Modèles Django suggérés (models.py) :
 *
 *   class Course(models.Model):
 *       name = models.CharField(max_length=120)
 *       level = models.CharField(max_length=20, choices=[
 *           ('debutant','Débutant'),('intermediaire','Intermédiaire'),('expert','Expert')])
 *       description = models.TextField(blank=True)
 *
 *   class Instructor(models.Model):
 *       first_name = models.CharField(max_length=80)
 *       last_name  = models.CharField(max_length=80)
 *       email      = models.EmailField(unique=True)
 *       bio        = models.TextField(blank=True)
 *
 *   class Student(models.Model):
 *       first_name = models.CharField(max_length=80)
 *       last_name  = models.CharField(max_length=80)
 *       email      = models.EmailField(unique=True)
 *       phone      = models.CharField(max_length=30)
 *       level      = models.CharField(max_length=20, choices=Course._meta.get_field('level').choices)
 *       course     = models.ForeignKey(Course, null=True, blank=True, on_delete=models.SET_NULL)
 *       created_at = models.DateTimeField(auto_now_add=True)
 */

export type Level = "debutant" | "intermediaire" | "expert";

export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  level: Level;
  course?: string | null;
  created_at: string;
}

export type StudentPayload = Omit<Student, "id" | "created_at">;

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "");
const STORAGE_KEY = "maison_couture_students";

/* ---------- Local fallback (démo sans backend) ---------- */
function readLocal(): Student[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeLocal(students: Student[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

/* ---------- Public API ---------- */
export async function listStudents(): Promise<Student[]> {
  if (API_URL) {
    const res = await fetch(`${API_URL}/students/`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`DRF error ${res.status}`);
    const data = await res.json();
    // DRF pagination: {results: [...]} ou liste brute
    return Array.isArray(data) ? data : data.results;
  }
  return readLocal().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function createStudent(payload: StudentPayload): Promise<Student> {
  if (API_URL) {
    const res = await fetch(`${API_URL}/students/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || `DRF error ${res.status}`);
    }
    return res.json();
  }
  // local
  const all = readLocal();
  if (all.some((s) => s.email.toLowerCase() === payload.email.toLowerCase())) {
    throw new Error("Cette adresse email est déjà inscrite.");
  }
  const student: Student = {
    ...payload,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  writeLocal([student, ...all]);
  return student;
}

export async function deleteStudent(id: string): Promise<void> {
  if (API_URL) {
    const res = await fetch(`${API_URL}/students/${id}/`, { method: "DELETE" });
    if (!res.ok) throw new Error(`DRF error ${res.status}`);
    return;
  }
  writeLocal(readLocal().filter((s) => s.id !== id));
}
