import { Link } from 'react-router-dom';
import { profile, navItems } from '@/data/portfolio';
import { ArrowUp, GraduationCap, Database, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const researchTopics = [
    'Hyperspectral Imaging (HSI)',
    'Spectroscopy Data Fusion',
    'Explainable AI (XAI)',
    'Agricultural Quality',
    'Medical Image Classification',
    'Gait Recognition',
  ];

  return (
    <footer className="border-t border-slate-200/90 bg-slate-900 text-slate-300 py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Bio (Col 1-5) */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-['Sora'] font-extrabold text-base flex items-center justify-center shadow-md">
                J
              </div>
              <span className="font-['Sora'] font-extrabold text-xl text-white tracking-tight">
                Md. Abu Johab<span className="text-sky-400">.</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-md">
              B.Sc. Graduate in Computer Science and Engineering from Pabna University of Science and Technology (PUST), Bangladesh. Conducting research in hyperspectral reconstruction, explainable AI, and spectroscopy data fusion.
            </p>

            {/* Social / Academic Icons */}
            <div className="flex items-center gap-2 pt-2">
              {profile.scholar && (
                <a
                  href={profile.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Scholar"
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700/60"
                >
                  <GraduationCap size={18} />
                </a>
              )}
              {profile.kaggle && (
                <a
                  href={profile.kaggle}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kaggle Profile"
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-sky-500 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700/60"
                >
                  <Database size={18} />
                </a>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700/60"
                >
                  <Github size={18} />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700/60"
                >
                  <Linkedin size={18} />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email Contact"
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-red-500 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700/60"
                >
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Navigation Links (Col 6-8) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-['Sora'] text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-sky-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Interest Tags (Col 9-12) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-['Sora'] text-xs font-bold text-white uppercase tracking-wider">Research Focus</h4>
            <div className="flex flex-wrap gap-1.5">
              {researchTopics.map((topic) => (
                <span
                  key={topic}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-2 font-mono">
              Department of Computer Science & Engineering, PUST
            </p>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Md. Abu Johab. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all inline-flex items-center gap-1.5 border border-slate-700/60"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
