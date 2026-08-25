"use server";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function joinWaitlist(
  _prevState: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!firstName) {
    return { status: "error", message: "Enter your first name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  // TODO: wire up to a real destination (email, sheet, DB) once decided.
  console.log("Waitlist signup:", { firstName, email });

  return { status: "success", message: "You're on the list — we'll be in touch." };
}
