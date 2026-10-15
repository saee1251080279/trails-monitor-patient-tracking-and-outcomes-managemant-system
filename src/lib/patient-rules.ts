import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().trim().min(1, "Enter the patient’s name"),
  age: z.coerce.number().int().min(0, "Age must be 0–120").max(120, "Age must be 0–120"),
  gender: z.enum(["Male", "Female", "Other"]),
  contact: z.string().regex(/^\+?[0-9 ()-]{7,20}$/, "Enter a valid phone number"),
});
export function isFutureAppointment(datetime: string, now = Date.now()) {
  const time = new Date(datetime).getTime();
  return Number.isFinite(time) && time > now;
}