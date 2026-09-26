import { skills } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeading } from './About';
import { Brain, Cpu, Layers, Code2, LineChart, Monitor, Globe, RefreshCw, LucideIcon } from 'lucide-react';

const categoryIcons: Record<string, LucideIcon> = {
  'Machine Learning & AI': Brain,
  'Reconstruction & Spectral Models': RefreshCw,
  'Frameworks & Libraries': Cpu,
  'Domain & Research Focus': Layers,
  'Programming & Tools': Code2,
  'Data Analysis & Methodology': LineChart,
  'Software & Productivity': Monitor,
  'Languages': Globe,
};

export default function Skills() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="skills" ref={ref} className="py-24 px-5 bg-gradient-to-b from-sky-50/40 via-blue-50/30 to-slate-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="02" title="Technical & Research Skills" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {skills.map((group, i) => {
            const Icon = categoryIcons[group.category] ?? Brain;
            return (
              <div
                key={group.category}
                className="reveal rounded-2xl border border-sky-200/80 bg-white/95 p-6 shadow-2xs hover:shadow-sky-100/70 hover:border-sky-400/80 transition-all duration-300 group flex flex-col justify-between"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300 shrink-0 shadow-2xs">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-['Sora'] text-base font-bold text-slate-900">{group.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-50/80 border border-sky-200/70 text-sky-950 hover:text-sky-900 hover:border-sky-300 hover:bg-sky-100 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
