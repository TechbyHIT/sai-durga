"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/faqs";

export function FAQAccordion({ faqs, title = "Frequently Asked Questions" }: { faqs: FaqItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h2 className="mb-4 text-2xl font-bold text-silver-900">{title}</h2>
      <div className="divide-y divide-silver-100 rounded-xl2 border border-silver-100 bg-base-white shadow-card">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question}>
              <button
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="font-medium text-silver-900">{faq.question}</span>
                <span className={`shrink-0 text-gold-600 transition-transform ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">
                  +
                </span>
              </button>
              {isOpen && <p className="px-5 pb-4 text-sm leading-relaxed text-silver-600">{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
