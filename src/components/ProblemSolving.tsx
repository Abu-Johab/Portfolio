import { contests, problemSolving } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeading } from './About';
import { Trophy, Code2, ExternalLink, Award } from 'lucide-react';

export default function ProblemSolving() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="problem-solving" ref={ref} className="py-24 px-5 bg-gradient-to-b from-blue-50/20 via-sky-50/30 to-slate-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="05" title="Problem Solving & Competitive Programming" />

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          {/* Platforms Overview */}
          <div className="reveal space-y-4">
            <h3 className="flex items-center gap-2 font-['Sora'] text-base font-bold text-slate-900 mb-2">
              <Code2 size={18} className="text-sky-600" /> Coding Platforms & Profile
            </h3>

            {problemSolving?.platforms.map((plat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50/80 via-white to-blue-50/60 p-6 shadow-2xs hover:shadow-sky-100/70 hover:border-sky-400 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                      Algorithmic Practice
                    </span>
                    <h4 className="font-['Sora'] text-lg font-bold text-slate-900 mt-2">{plat.name}</h4>
                    <p className="text-sm text-slate-700 font-medium mt-1.5 leading-relaxed">{plat.details}</p>
                  </div>

                  {plat.url && (
                    <a
                      href={plat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-sky-200 bg-white text-sky-700 hover:bg-sky-50 hover:border-sky-400 transition-all shrink-0 shadow-2xs"
                      title="View Codeforces Profile"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contest Highlights */}
          <div className="reveal space-y-4" style={{ transitionDelay: '100ms' }}>
            <h3 className="flex items-center gap-2 font-['Sora'] text-base font-bold text-slate-900 mb-2">
              <Trophy size={18} className="text-sky-600" /> Contest Highlights
            </h3>

            <div className="space-y-3">
              {contests.map((c, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-sky-200/80 bg-white/90 p-5 shadow-2xs hover:shadow-sky-100/70 hover:border-sky-400 hover:bg-sky-50/30 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Award size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-['Sora'] text-sm sm:text-base font-bold text-slate-900">{c.name}</h4>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      {c.organizer} · <span className="text-sky-700 font-bold">{c.role}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
