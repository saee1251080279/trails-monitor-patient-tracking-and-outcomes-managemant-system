import { describe, expect, it } from "vitest";
import { patientSchema, isFutureAppointment } from "../lib/patient-rules";
const valid = { name: "Fictional Patient", age: 28, gender: "Male", contact: "+1 555 010 1001" };
describe("patient rules", () => {
  it("requires a non-empty name", () => expect(patientSchema.safeParse({ ...valid, name: " " }).success).toBe(false));
  it("accepts ages 0 and 120 and rejects -1 and 121", () => {
    for (const age of [0, 120]) expect(patientSchema.safeParse({ ...valid, age }).success).toBe(true);
    for (const age of [-1, 121]) expect(patientSchema.safeParse({ ...valid, age }).success).toBe(false);
  });
  it("rejects a malformed phone", () => expect(patientSchema.safeParse({ ...valid, contact: "hello" }).success).toBe(false));
  it("rejects past appointment dates", () => {
    const now = Date.parse("2026-10-15T10:00:00Z");
    expect(isFutureAppointment("2026-10-15T09:59:00Z", now)).toBe(false);
    expect(isFutureAppointment("2026-10-15T10:01:00Z", now)).toBe(true);
  });
});