import Image from "next/image";

type CalculatorHeroBannerProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
};

export function CalculatorHeroBanner({ title, subtitle, imageSrc }: CalculatorHeroBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Image
        src={imageSrc}
        alt={title}
        width={1400}
        height={420}
        className="h-48 w-full object-cover md:h-56"
      />
      <div className="absolute inset-0 bg-slate-900/55" />
      <div className="absolute inset-0 flex items-end p-6 md:p-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-sky-200">Calculator</p>
          <h1 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-100 md:text-base">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
