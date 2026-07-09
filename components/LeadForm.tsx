"use client";

import { useState, FormEvent } from "react";
import { services } from "@/data/services";
import { site } from "@/lib/site";

export function LeadForm({ defaultService, title = "Get a Free Quote" }: { defaultService?: string; title?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService ?? services[0].slug);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const serviceName = services.find((s) => s.slug === service)?.name ?? service;
    const text = [
      `Hi ${site.name}, I'd like a free quote.`,
      `Name: ${name || "-"}`,
      `Phone: ${phone || "-"}`,
      `Service: ${serviceName}`,
      `Location: ${location || "-"}`,
      message ? `Message: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `${site.whatsappHref}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl2 border border-gold-100 bg-gold-50/70 p-6 text-center shadow-card">
        <h2 className="text-xl font-bold text-silver-900">Thank you!</h2>
        <p className="mt-2 text-sm text-silver-600">
          Your enquiry is ready to send on WhatsApp. Our team will respond with a free site-visit slot.
        </p>
        <p className="mt-4 text-sm font-semibold text-silver-900">Need a faster response? WhatsApp us now.</p>
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Open WhatsApp
        </a>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-3 block w-full text-xs font-semibold text-gold-700 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl2 border border-silver-100 bg-base-white p-6 shadow-card">
      <h2 className="text-xl font-bold text-silver-900">{title}</h2>
      <p className="mt-1 text-sm text-silver-500">We&rsquo;ll respond on WhatsApp with a free site-visit slot.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-silver-700">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-lg border border-silver-200 px-3 py-2 text-base focus:border-gold-400 focus:outline-none"
            placeholder="Your name"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-silver-700">
          Phone
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            type="tel"
            className="rounded-lg border border-silver-200 px-3 py-2 text-base focus:border-gold-400 focus:outline-none"
            placeholder="10-digit mobile number"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-silver-700">
          Service Needed
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="rounded-lg border border-silver-200 px-3 py-2 text-base focus:border-gold-400 focus:outline-none"
          >
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-silver-700">
          City / Area
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-lg border border-silver-200 px-3 py-2 text-base focus:border-gold-400 focus:outline-none"
            placeholder="e.g. Gajuwaka, Visakhapatnam"
          />
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-1 text-sm font-medium text-silver-700">
        Message (optional)
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="rounded-lg border border-silver-200 px-3 py-2 text-base focus:border-gold-400 focus:outline-none"
          placeholder="Tell us about your balcony, terrace, or requirement"
        />
      </label>

      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-gold-500 px-6 py-3 text-base font-semibold text-white shadow-gold hover:bg-gold-600 sm:w-auto"
      >
        Send via WhatsApp
      </button>
    </form>
  );
}
