import { experience, volunteering } from '@/data/portfolio';
import { getAssetUrl } from '@/utils/assets';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeading } from './About';
import { Briefcase, HeartHandshake, Camera } from 'lucide-react';

export default function Experience() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="experience" ref={ref} className="py-24 px-5 bg-gradient-to-b from-slate-50 via-sky-50/30 to-blue-50/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="04" title="Work & Volunteer Experience" />

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          {/* Work Experience */}
          <div className="reveal">
            <h3 className="flex items-center gap-2 font-['Sora'] text-base font-bold text-slate-900 mb-4">
              <Briefcase size={18} className="text-sky-600" /> Research & Work Experience
            </h3>
            <div className="space-y-4">
              {experience.map((job, i) => (
                <div key={i} className="rounded-2xl border border-sky-200/80 bg-white/95 p-6 shadow-2xs hover:shadow-sky-100/70 hover:border-sky-400/80 transition-all duration-300">
                  <div className="flex justify-between gap-3 flex-wrap items-start">
                    <div>
                      <h4 className="font-['Sora'] text-base font-bold text-slate-900">{job.role}</h4>
                      {job.department && (
                        <p className="text-xs text-sky-700 font-bold mt-0.5">{job.department}</p>
                      )}
                      {job.institution && (
                        <p className="text-xs text-slate-600 font-medium mt-0.5">{job.institution}{job.location ? `, ${job.location}` : ''}</p>
                      )}
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full border border-sky-200 text-sky-800 bg-sky-50">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed font-normal">{job.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Extra-Curricular Activities & Volunteering */}
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <h3 className="flex items-center gap-2 font-['Sora'] text-base font-bold text-slate-900 mb-4">
              <HeartHandshake size={18} className="text-sky-600" /> Extra-Curricular & Volunteering
            </h3>
            <div className="space-y-4">
              {volunteering.map((vol, i) => (
                <div key={i} className="rounded-2xl border border-sky-200/80 bg-white/95 p-5 sm:p-6 shadow-2xs hover:shadow-sky-100/70 hover:border-sky-400/80 transition-all duration-300 group">
                  {/* Event Photo / Placeholder Container */}
                  <div className="relative w-full h-36 mb-4 rounded-xl overflow-hidden border border-sky-200/70 bg-gradient-to-br from-sky-50 via-blue-50/40 to-slate-100 group-hover:border-sky-300 transition-colors">
                    {vol.image ? (
                      <img
                        src={getAssetUrl(vol.image)}
                        alt={vol.role}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-sky-50/80 via-blue-50/50 to-slate-100 flex flex-col items-center justify-center p-3 text-center relative overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-white/90 text-sky-600 shadow-2xs flex items-center justify-center mb-1.5 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                          <Camera size={20} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 font-['Sora'] flex items-center gap-1">
                          Event Photo Record
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                          (PECCII 2026 International Conference)
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-['Sora'] text-base font-bold text-slate-900">{vol.role}</h4>
                    <span className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 shrink-0">
                      {vol.period}
                    </span>
                  </div>
                  <p className="text-xs text-sky-700 font-semibold mt-1">{vol.organization}</p>
                  {vol.description && (
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal leading-relaxed">{vol.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
