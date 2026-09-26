import { projects } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeading } from './About';
import { FolderGit2, ArrowUpRight } from 'lucide-react';

export default function Projects() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="projects" ref={ref} className="py-24 px-5 bg-gradient-to-b from-sky-50/30 via-slate-50 to-blue-50/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="05" title="Software Projects" />

        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          {projects.map((project, i) => (
            <article
              key={project.name}
              className="reveal group rounded-2xl border border-sky-200/80 bg-white/95 p-6 shadow-2xs hover:shadow-sky-100/70 hover:border-sky-400 transition-all hover:-translate-y-1 duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300 shadow-2xs">
                  <FolderGit2 size={22} />
                </div>
                <ArrowUpRight size={18} className="text-slate-400 group-hover:text-sky-600 transition-colors" />
              </div>

              <h3 className="font-['Sora'] text-lg font-bold text-slate-900 mb-1">{project.name}</h3>
              <p className="text-xs font-bold text-sky-700 mb-3">{project.tech}</p>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">{project.description}</p>
            </article>
          ))}
        </div>

        <p className="reveal text-sm text-slate-500 mt-8 text-center font-medium">
          More software and course projects coming soon as I continue to build.
        </p>
      </div>
    </section>
  );
}
