import { personal, profile, references } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeading } from './About';
import { Mail, MapPin, User, Linkedin, Copy, Check, GraduationCap, Phone, Github, Database } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const ref = useReveal<HTMLElement>();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (!profile.email) return;
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-sky-50/30 via-blue-50/20 to-slate-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="08" title="Contact & References" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
          {/* Contact card */}
          <div className="reveal rounded-2xl border border-sky-200/80 bg-white/95 p-5 sm:p-6 shadow-xs">
            <h3 className="font-['Sora'] text-base sm:text-lg font-bold text-slate-900 mb-1">Get in touch</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 font-normal">
              Feel free to reach out for research collaboration, academic inquiries, or networking.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <User size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-500 font-medium">Name</div>
                  <div className="text-xs sm:text-sm text-slate-900 font-bold truncate">{profile.name}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-500 font-medium">Location</div>
                  <div className="text-xs sm:text-sm text-slate-900 font-medium truncate">{profile.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Phone size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-500 font-medium">Phone</div>
                  <div className="text-xs sm:text-sm text-slate-900 font-medium">{profile.phone}</div>
                </div>
              </div>

              {profile.email && (
                <button onClick={copyEmail} className="flex items-center gap-3 w-full text-left group">
                  <div className="w-10 h-10 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500 font-medium">Primary Email</div>
                    <div className="text-xs sm:text-sm text-slate-900 font-medium truncate group-hover:text-sky-700 transition-colors">{profile.email}</div>
                  </div>
                  {copied ? <Check size={16} className="text-sky-600 shrink-0" /> : <Copy size={16} className="text-slate-400 group-hover:text-sky-600 shrink-0" />}
                </button>
              )}

              {profile.secondaryEmail && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 shadow-2xs">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-slate-500 font-medium">Academic Email</div>
                    <div className="text-xs sm:text-sm text-slate-900 font-medium truncate">{profile.secondaryEmail}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-6 pt-4 border-t border-sky-100">
              {profile.kaggle && (
                <a
                  href={profile.kaggle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl border border-sky-200 bg-sky-50/80 text-xs font-bold text-sky-800 hover:bg-sky-100 hover:border-sky-300 transition-all inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <Database size={15} className="text-sky-600" /> Kaggle
                </a>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl border border-sky-200 bg-sky-50/80 text-xs font-bold text-slate-800 hover:bg-sky-100 hover:border-sky-300 transition-all inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <Github size={15} className="text-slate-800" /> GitHub
                </a>
              )}
              {profile.scholar && (
                <a
                  href={profile.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl border border-sky-200 bg-sky-50/80 text-xs font-bold text-slate-800 hover:bg-sky-100 hover:border-sky-300 hover:text-sky-900 transition-all inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <GraduationCap size={15} className="text-sky-600" /> Google Scholar
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl border border-sky-200 bg-sky-50/80 text-xs font-bold text-slate-800 hover:bg-sky-100 hover:border-sky-300 hover:text-sky-900 transition-all inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <Linkedin size={15} className="text-sky-600" /> LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Personal details */}
          <div className="reveal" style={{ transitionDelay: '120ms' }}>
            <div className="rounded-2xl border border-sky-200/80 bg-white/95 p-5 sm:p-6 shadow-xs">
              <h3 className="font-['Sora'] text-base sm:text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-sky-100">Personal Information</h3>
              <dl className="space-y-3">
                {personal.map((item) => (
                  <div key={item.label} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-3 text-xs sm:text-sm border-b border-sky-100/70 pb-2.5 last:border-0 last:pb-0">
                    <dt className="text-slate-500 font-medium sm:col-span-1">{item.label}</dt>
                    <dd className="text-slate-900 font-semibold sm:col-span-2">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* References */}
        {references && references.length > 0 && (
          <div className="mt-10 sm:mt-12">
            <h3 className="font-['Sora'] text-lg sm:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shrink-0" /> Academic & Research References
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {references.map((refItem, idx) => (
                <div
                  key={refItem.name}
                  className="reveal rounded-2xl border border-sky-200/80 bg-white/95 p-5 sm:p-6 shadow-2xs hover:shadow-sky-100/70 hover:border-sky-400 transition-all duration-300 flex flex-col justify-between"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div>
                    <h4 className="font-['Sora'] text-sm sm:text-base font-bold text-slate-900">{refItem.name}</h4>
                    <p className="text-xs sm:text-sm text-sky-800 mt-1 font-bold">{refItem.role}</p>
                    <p className="text-xs text-slate-600 font-medium mt-1">{refItem.institution}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{refItem.location}</p>
                  </div>

                  <a
                    href={`mailto:${refItem.email}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 bg-sky-50/80 px-3 py-2 rounded-xl border border-sky-200/80 mt-4 hover:border-sky-400 hover:bg-sky-100 hover:text-sky-900 transition-colors shadow-2xs self-start"
                  >
                    <Mail size={14} className="text-sky-600 shrink-0" /> <span className="truncate">{refItem.email}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
