import { CTAButtons } from "./CTAButtons";

export function FinalCta({ text }: { text: string }) {
  return (
    <section className="bg-silver-900 py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center sm:px-6">
        <p className="text-xl font-bold text-white sm:text-2xl">{text}</p>
        <CTAButtons />
      </div>
    </section>
  );
}
