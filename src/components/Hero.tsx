import { Link } from 'react-router-dom';
import { MapPin, Code2, GraduationCap, BookOpen, Database, Sparkles, ExternalLink, Mail, Github, Linkedin } from 'lucide-react';
import { profile, publications, underReview, datasetCreations } from '@/data/portfolio';

export default function Hero() {
  return (
    <section id="home" className="pt-28 sm:pt-36 pb-14 sm:pb-18 bg-gradient-to-b from-sky-100/90 via-sky-50 to-blue-100/60 border-b border-sky-200/80 relative overflow-hidden">
      {/* Soft Ambient Hero Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-sky-300/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="space-y-6">
          
          {/* Main Title & Institution */}
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/90 text-sky-800 text-xs font-bold border border-sky-200/80 shadow-2xs">
              <Sparkles size={13} className="text-sky-600" /> Academic & Machine Learning Portfolio
            </span>
            <h1 className="font-['Sora'] text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {profile.name}
            </h1>
            <p className="text-lg sm:text-xl text-sky-800 font-['Sora'] font-semibold">
              {profile.title}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-slate-800 font-semibold bg-white/70 px-3 py-1 rounded-lg border border-sky-100 shadow-2xs">
                <GraduationCap size={16} className="text-sky-600" /> {profile.university}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-slate-700 bg-white/70 px-3 py-1 rounded-lg border border-sky-100 shadow-2xs">
                <MapPin size={15} className="text-sky-600" /> {profile.location}
              </span>
            </p>
          </div>

          {/* Research Bio */}
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal max-w-3xl bg-white/50 backdrop-blur-xs p-4 rounded-2xl border border-sky-100/80 shadow-2xs">
            {profile.tagline}
          </p>

          {/* Verified Portal Direct Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {profile.scholar && (
              <a
                href={profile.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-sky-50 text-slate-800 hover:text-sky-800 text-xs font-bold transition-all inline-flex items-center gap-1.5 border border-sky-200/80 shadow-2xs hover:border-sky-300 hover:shadow-sky-100/60"
              >
                <GraduationCap size={15} className="text-sky-600" />
                <span>Google Scholar</span>
                <ExternalLink size={12} className="text-slate-400" />
              </a>
            )}
            {profile.kaggle && (
              <a
                href={profile.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-sky-50 text-slate-800 hover:text-sky-800 text-xs font-bold transition-all inline-flex items-center gap-1.5 border border-sky-200/80 shadow-2xs hover:border-sky-300 hover:shadow-sky-100/60"
              >
                <Database size={15} className="text-sky-600" />
                <span>Kaggle</span>
                <ExternalLink size={12} className="text-slate-400" />
              </a>
            )}
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-sky-50 text-slate-800 hover:text-sky-800 text-xs font-bold transition-all inline-flex items-center gap-1.5 border border-sky-200/80 shadow-2xs hover:border-sky-300 hover:shadow-sky-100/60"
              >
                <Github size={15} className="text-slate-700" />
                <span>GitHub</span>
                <ExternalLink size={12} className="text-slate-400" />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-blue-50 text-slate-800 hover:text-blue-800 text-xs font-bold transition-all inline-flex items-center gap-1.5 border border-sky-200/80 shadow-2xs hover:border-sky-300 hover:shadow-sky-100/60"
              >
                <Linkedin size={15} className="text-blue-600" />
                <span>LinkedIn</span>
                <ExternalLink size={12} className="text-slate-400" />
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-red-50 text-slate-800 hover:text-red-700 text-xs font-bold transition-all inline-flex items-center gap-1.5 border border-sky-200/80 shadow-2xs hover:border-red-200"
              >
                <Mail size={15} className="text-red-500" />
                <span>Email Contact</span>
              </a>
            )}
          </div>

          {/* Minimal Academic Metrics Pill Box */}
          <div className="pt-4 border-t border-sky-200/70">
            <div className="bg-white/80 border border-sky-200/80 backdrop-blur-xs p-4 rounded-2xl shadow-2xs flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                  <BookOpen size={15} />
                </div>
                <span><strong className="text-slate-900 font-extrabold text-sm">{publications.length}+</strong> Peer-Reviewed Papers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sparkles size={15} />
                </div>
                <span><strong className="text-slate-900 font-extrabold text-sm">{underReview.length}</strong> Under Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Database size={15} />
                </div>
                <span><strong className="text-slate-900 font-extrabold text-sm">{datasetCreations.length}</strong> Mendeley Datasets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <GraduationCap size={15} />
                </div>
                <span><strong className="text-slate-900 font-extrabold text-sm">3.65 / 4.00</strong> CGPA</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
