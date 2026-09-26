import { education } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeading } from './About';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="education" ref={ref} className="py-24 px-5 bg-gradient-to-b from-blue-50/20 via-sky-50/30 to-slate-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="03" title="Education" />

        <div className="relative mt-12 pl-6 sm:pl-8">
          {/* vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-sky-500 via-sky-300 to-blue-200" />

          <div className="space-y-8">
            {education.map((edu, i) => (
              <div
                key={i}
                className="reveal relative"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* dot */}
                <div className="absolute -left-6 sm:-left-8 top-2 w-3.5 h-3.5 rounded-full bg-sky-600 ring-4 ring-sky-100 shadow-xs" />

                <div className="rounded-2xl border border-sky-200/80 bg-white/95 p-6 shadow-2xs hover:shadow-sky-100/70 hover:border-sky-400/80 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <h3 className="font-['Sora'] text-base font-bold text-slate-900">{edu.degree}</h3>
                        <p className="text-sm font-semibold text-sky-800 mt-0.5">{edu.institution}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-sky-800 whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>

                  {edu.detail && <p className="text-sm text-slate-600 mt-3 sm:ml-13 leading-relaxed">{edu.detail}</p>}

                  <div className="mt-4 flex flex-wrap gap-2 sm:ml-13">
                    {edu.grades.map((g) => (
                      <div
                        key={g.term}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-50/80 border border-sky-200/70"
                      >
                        <span className="text-xs font-medium text-slate-600">{g.term}</span>
                        <span className="text-sm font-extrabold text-sky-800">
                          {g.gpa}<span className="text-slate-400 font-normal">/{g.scale}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
