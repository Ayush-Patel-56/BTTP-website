"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { joinWaitlist, type WaitlistState } from "@/app/actions";

const initialState: WaitlistState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-[#FF9F1C] px-7 py-3 text-sm font-semibold text-[#241a05] transition hover:bg-[#ffb13f] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Joining..." : "Join The Waitlist"}
    </button>
  );
}

export default function Waitlist() {
  const [state, formAction] = useActionState(joinWaitlist, initialState);

  return (
    <section id="join-waitlist" className="bg-[#0a0e17] px-6 py-24">
      <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold tracking-wide text-[#FF9F1C] uppercase">Join The Waitlist</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-[2.75rem] md:leading-tight">
            Be First To Get Every Point Back.
          </h2>
          <p className="mt-6 max-w-md text-white/50">
            We&apos;re opening up access in waves. Leave your name and email and we&apos;ll let you
            know the moment there&apos;s a spot for you.
          </p>
        </div>

        <div>
          {state.status === "success" ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center">
              <p className="text-lg font-semibold text-white">You&apos;re on the list</p>
              <p className="mt-2 text-white/50">{state.message}</p>
            </div>
          ) : (
            <form action={formAction} className="flex flex-col gap-8">
              <label className="block">
                <span className="text-sm font-semibold text-white">First Name</span>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name here"
                  required
                  className="mt-3 w-full border-b border-white/20 bg-transparent pb-2.5 text-white placeholder:text-white/30 focus:border-[#FF9F1C] focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-white">Email Address</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email here"
                  required
                  className="mt-3 w-full border-b border-white/20 bg-transparent pb-2.5 text-white placeholder:text-white/30 focus:border-[#FF9F1C] focus:outline-none"
                />
              </label>

              {state.status === "error" && (
                <p role="alert" className="text-sm font-medium text-red-400">
                  {state.message}
                </p>
              )}

              <SubmitButton />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
