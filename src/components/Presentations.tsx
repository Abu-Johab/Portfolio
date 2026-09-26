import { presentations } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeading } from './About';
import { Presentation as PresentationIcon, Mic, ExternalLink } from 'lucide-react';

export default function Presentations() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="presentations" ref={ref} className="py-24 px-5 bg-slate-100/70">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="08" title="Presentations & Talks" />

        {presentations.length === 0 ? (
          <div className="reveal mt-12 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4">
              <PresentationIcon size={24} />
            </div>
            <h3 className="font-['Sora'] text-base font-bold text-slate-900 mb-2">No presentations yet</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Conference presentations and talks will be listed here once added.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            {presentations.map((pres, i) => (
              <article
                key={i}
                className="reveal rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:shadow-md hover:border-sky-400/60 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Mic size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                          {pres.type}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{pres.year}</span>
                      </div>
                      <h3 className="font-['Sora'] text-sm font-bold text-slate-900 leading-snug">{pres.title}</h3>
                      <p className="text-xs text-slate-600 font-medium mt-1.5">{pres.conference}</p>
                    </div>
                  </div>

                  {pres.url && (
                    <a
                      href={pres.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-sky-700 hover:border-sky-400 hover:bg-sky-50 transition-colors shrink-0"
                      title="View presentation details"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
