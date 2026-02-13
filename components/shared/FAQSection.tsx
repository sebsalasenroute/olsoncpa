type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title?: string;
  items: FAQItem[];
};

export function FAQSection({ title = "FAQs", items }: FAQSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <details key={item.question} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <summary className="cursor-pointer text-sm font-semibold text-slate-800">{item.question}</summary>
            <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
