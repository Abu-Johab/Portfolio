import { profile, about } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';

export default function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="py-24 px-5 bg-gradient-to-b from-sky-50/50 via-slate-50 to-blue-50/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="01" title="About Me" />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="md:col-span-2 space-y-5">
            {about.map((para, i) => (
              <p
                key={i}
                className="reveal text-slate-700 leading-relaxed text-base sm:text-lg font-normal bg-white/70 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-sky-100/90 shadow-2xs"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {para}
              </p>
            ))}
          </div>

          <aside className="reveal" style={{ transitionDelay: '240ms' }}>
            <div className="rounded-2xl border border-sky-200/80 bg-gradient-to-br from-white via-sky-50/70 to-slate-50 p-6 shadow-xs">
              <h3 className="font-['Sora'] text-base font-bold text-slate-900 mb-4 pb-2 border-b border-sky-100/80 flex items-center justify-between">
                <span>Quick Facts</span>
                <span className="text-xs font-mono font-bold text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded border border-sky-200">PUST</span>
              </h3>
              <dl className="space-y-3.5 text-sm">
                <Fact label="Focus" value="Machine Learning & XAI" />
                <Fact label="University" value="PUST" />
                <Fact label="Role" value="B.Sc. Graduate & Researcher" />
                <Fact label="Location" value="Pabna, Bangladesh" />
                <Fact label="Languages" value="Bengali, English" />
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-sky-100/60 pb-2.5 last:border-0 last:pb-0">
      <dt className="text-slate-500 font-medium">{label}</dt>
      <dd className="text-slate-900 font-semibold text-right">{value}</dd>
    </div>
  );
}

export function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="reveal flex items-baseline gap-4">
      <span className="font-['Sora'] text-sky-700 text-sm font-mono font-bold">{index}</span>
      <h2 className="font-['Sora'] text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-sky-300 via-sky-200 to-transparent" />
    </div>
  );
}
