import { socials } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeading } from './About';
import { GraduationCap, FlaskConical, Github, Linkedin, Facebook, ArrowUpRight, Mail } from 'lucide-react';

const iconMap = {
  graduation: GraduationCap,
  flask: FlaskConical,
  github: Github,
  linkedin: Linkedin,
  facebook: Mail,
} as const;

export default function Connect() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="connect" ref={ref} className="py-24 px-5 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="07" title="Connect" />
        <p className="reveal text-slate-600 mt-4 max-w-2xl font-normal">
          Find me across the web — research publications, professional network, and academic profiles.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {socials.map((s, i) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap] ?? FlaskConical;
            const content = (
              <div
                className="reveal group h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs hover:border-sky-400/60 hover:shadow-md transition-all duration-300"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-2xs"
                    style={{ backgroundColor: `${s.color}15` }}
                  >
                    <Icon size={22} style={{ color: s.color }} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-400 group-hover:text-sky-600 transition-colors"
                  />
                </div>
                <h3 className="font-['Sora'] text-lg font-bold text-slate-900 mt-4">{s.name}</h3>
                <p className="text-sm text-slate-600 font-normal mt-1">{s.description}</p>
                <p className="text-xs text-sky-700 font-semibold mt-3">{s.handle}</p>
              </div>
            );

            return s.url ? (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {content}
              </a>
            ) : (
              <div key={s.name} className="h-full opacity-70">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
