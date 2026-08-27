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
  const phone = String(formData.get("phone") ?? "").trim();
  const expectation = String(formData.get("message") ?? "").trim();

  if (!firstName) {
    return { status: "error", message: "Enter your first name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }
  if (!/^[0-9+\-\s()]{7,}$/.test(phone)) {
    return { status: "error", message: "Enter a valid phone number." };
  }

  const webhookUrl = process.env.WAITLIST_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("Waitlist signup (no webhook configured):", { firstName, email, phone, expectation });
    return { status: "success", message: "You're on the list — we'll be in touch." };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, email, phone, expectation }),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to record waitlist signup:", error);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  return { status: "success", message: "You're on the list — we'll be in touch." };
}
