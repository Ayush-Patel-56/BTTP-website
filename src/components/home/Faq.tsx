"use client";

import { useRef, useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How do I redeem my points?",
    answer:
      "Link your bank and loyalty accounts once, then browse live redemption options inside BTTP — we handle the transfer and booking steps end-to-end.",
  },
  {
    question: "Which banks and cards do you support?",
    answer:
      "American Express, HDFC, ICICI, Axis, SBI Card, IDFC FIRST, IndusInd, and YES Bank, with new issuers added regularly.",
  },
  {
    question: "Is there a joining or subscription fee?",
    answer:
      "No. BTTP is free to join — we only earn a small fee when you complete a redemption through the platform.",
  },
  {
    question: "How does BTTP actually work?",
    answer:
      "We connect to your existing cards and loyalty programs, track your real balance across all of them, and surface the best way to spend those points for flights, hotels, and upgrades.",
  },
  {
    question: "Is my card and account data safe?",
    answer:
      "Yes — we use bank-grade encryption and never store your card credentials. Connections are read-only wherever your bank supports it.",
  },
  {
    question: "Can I track multiple loyalty programs at once?",
    answer:
      "Absolutely. Most members track three to six programs side by side and let BTTP recommend the best one to redeem from for a given trip.",
  },
  {
    question: "What if I need help from a real person?",
    answer:
      "Our support team is available in-app for anything the assistant can't resolve — most queries get a human reply within a few hours.",
  },
  {
    question: "Do you support international airlines and hotels?",
    answer:
      "Yes, including Emirates, Singapore Airlines, British Airways, Qatar Airways, Marriott Bonvoy, Hilton Honors, IHG, and Accor.",
  },
];

const GREETING = "Ask me anything about points, cards, or bookings — I'll do my best to help.";
const TYPING_DELAY_MS = 900;

type Stage = "typing" | "answered";

function BotAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a0e17] text-xs font-bold text-[#FF9F1C]">
      B
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-[#f0f2f5] px-4 py-4">
      <span className="animate-typing-bounce h-2 w-2 rounded-full bg-black/30" style={{ animationDelay: "0ms" }} />
      <span className="animate-typing-bounce h-2 w-2 rounded-full bg-black/30" style={{ animationDelay: "150ms" }} />
      <span className="animate-typing-bounce h-2 w-2 rounded-full bg-black/30" style={{ animationDelay: "300ms" }} />
    </div>
  );
}

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [stage, setStage] = useState<Stage>("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function askQuestion(index: number) {
    clearTimeout(timeoutRef.current);
    setActiveIndex(index);
    setStage("typing");
    timeoutRef.current = setTimeout(() => setStage("answered"), TYPING_DELAY_MS);
  }

  const activeFaq = activeIndex !== null ? faqs[activeIndex] : null;

  return (
    <section className="bg-[#f5f7fa] px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-[#FF9F1C] uppercase">Ask BTTP</p>
          <h2 className="mt-3 text-3xl font-bold text-black sm:text-4xl">
            Got questions? Our AI has answers.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-black/50">
            Tap a question below and see how the BTTP assistant responds.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl shadow-black/5">
          <div className="flex items-center gap-3 border-b border-black/5 bg-[#0a0e17] px-6 py-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <p className="text-sm font-semibold text-white">BTTP Assistant</p>
            <span className="ml-auto text-[11px] font-medium tracking-wide text-white/40 uppercase">
              Online
            </span>
          </div>

          <div className="flex min-h-[220px] flex-col justify-end gap-4 p-6 sm:min-h-[260px] sm:p-8">
            {!activeFaq && (
              <div key="greeting" className="animate-bubble-in flex max-w-[85%] items-start gap-3 self-start">
                <BotAvatar />
                <div className="rounded-2xl rounded-tl-sm bg-[#f0f2f5] px-4 py-3 text-sm text-black/70 sm:text-base">
                  {GREETING}
                </div>
              </div>
            )}

            {activeFaq && (
              <>
                <div
                  key={`q-${activeIndex}`}
                  className="animate-bubble-in flex max-w-[85%] items-start gap-3 self-end"
                >
                  <div className="rounded-2xl rounded-tr-sm bg-[#FF9F1C] px-4 py-3 text-sm font-medium text-[#241a05] sm:text-base">
                    {activeFaq.question}
                  </div>
                </div>

                {stage === "typing" ? (
                  <div
                    key={`typing-${activeIndex}`}
                    className="animate-bubble-in flex max-w-[85%] items-start gap-3 self-start"
                  >
                    <BotAvatar />
                    <TypingDots />
                  </div>
                ) : (
                  <div
                    key={`a-${activeIndex}`}
                    className="animate-bubble-in flex max-w-[85%] items-start gap-3 self-start"
                  >
                    <BotAvatar />
                    <div className="rounded-2xl rounded-tl-sm bg-[#f0f2f5] px-4 py-3 text-sm text-black/70 sm:text-base">
                      {activeFaq.answer}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {faqs.map((faq, index) => (
            <button
              key={faq.question}
              type="button"
              onClick={() => askQuestion(index)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeIndex === index
                  ? "border-[#FF9F1C] bg-[#FF9F1C]/10 text-[#241a05]"
                  : "border-black/10 bg-white text-black/60 hover:border-black/20 hover:text-black"
              }`}
            >
              {faq.question}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
