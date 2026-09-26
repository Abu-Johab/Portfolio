import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import NewsTimeline from '@/components/NewsTimeline';
import { publications, skills, profile, eventsGallery, datasetCreations, Publication } from '@/data/portfolio';
import { getAssetUrl } from '@/utils/assets';
import { ArrowRight, BookOpen, Briefcase, GraduationCap, Mail, Database, ExternalLink, Camera, Sparkles, Quote, X, Copy, Check } from 'lucide-react';

export default function Home() {
  const recentPublications = publications.slice(0, 4);
  const [activeBibtex, setActiveBibtex] = useState<{ title: string; bibtex: string } | null>(null);
  const [modalCopied, setModalCopied] = useState(false);

  const generateGenericBibtex = (pub: Publication) => {
    if (pub.bibtex) return pub.bibtex;
    const key = pub.authors.split(',')[0].toLowerCase().replace(/[^a-z0-9]/g, '') + pub.year;
    return `@inproceedings{${key},
  title={${pub.title}},
  author={${pub.authors}},
  booktitle={${pub.venue}},
  year={${pub.year}}${pub.doi ? `,\n  doi={${pub.doi}}` : ''}
}`;
  };

  const handleCopyModalBibtex = () => {
    if (!activeBibtex) return;
    navigator.clipboard.writeText(activeBibtex.bibtex);
    setModalCopied(true);
    setTimeout(() => setModalCopied(false), 2000);
  };

  return (
    <div className="space-y-10 sm:space-y-12 pb-16 bg-gradient-to-b from-sky-50/50 via-slate-50 to-blue-50/30">
      <Hero />

      {/* News & Announcements Feed */}
      <NewsTimeline />

      {/* Mendeley Dataset Releases Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-sky-200/80 bg-gradient-to-br from-white via-sky-50/60 to-blue-50/40 p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-sky-100/80">
            <div>
              <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-wider">Open Research Data</span>
              <h2 className="font-['Sora'] text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                Mendeley Data Dataset Releases
              </h2>
            </div>
            <Link
              to="/publications"
              className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1"
            >
              View datasets tab &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datasetCreations.map((ds, idx) => (
              <div key={idx} className="rounded-xl border border-sky-100/90 bg-white/90 hover:bg-sky-50/50 hover:border-sky-300 p-4.5 flex flex-col justify-between shadow-2xs hover:shadow-sky-100/50 transition-all">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-sky-100/80 text-sky-800 border border-sky-200">
                      {ds.publisher} ({ds.version})
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{ds.date}</span>
                  </div>
                  <h3 className="font-['Sora'] text-sm font-bold text-slate-900 leading-snug">{ds.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium">{ds.authors}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500 text-[11px]">DOI: {ds.doi}</span>
                  <a
                    href={ds.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-lg bg-sky-600 text-white font-bold hover:bg-sky-700 transition-colors inline-flex items-center gap-1 shadow-2xs"
                  >
                    <span>Dataset</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-wider">Publications</span>
            <h2 className="font-['Sora'] text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">Recent Research Papers</h2>
          </div>
          <Link
            to="/publications"
            className="px-3.5 py-1.5 rounded-xl border border-sky-200 bg-white/90 text-xs font-bold text-sky-800 hover:bg-sky-50 transition-all inline-flex items-center gap-1.5 shadow-2xs"
          >
            <span>All 13 Papers</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-3.5">
          {recentPublications.map((pub, idx) => (
            <article key={idx} className="rounded-2xl border border-sky-100/90 bg-white/90 p-5 shadow-2xs hover:border-sky-300 hover:shadow-sky-100/60 hover:bg-gradient-to-r hover:from-white hover:to-sky-50/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                      pub.type === 'Journal'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-sky-50 text-sky-700 border-sky-200'
                    }`}
                  >
                    {pub.type}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{pub.year}</span>
                </div>
                <h3 className="font-['Sora'] text-base font-bold text-slate-900 leading-snug">{pub.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {pub.authors.split('M. A. Johab').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && <strong className="text-slate-900 font-bold underline">M. A. Johab</strong>}
                    </span>
                  ))}
                </p>
                <p className="text-xs text-sky-700 font-semibold mt-1.5">{pub.venue}</p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-sky-100">
                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-sky-50/80 border border-sky-200 text-sky-800 hover:bg-sky-600 hover:text-white text-xs font-bold transition-colors inline-flex items-center gap-1 shadow-2xs"
                  >
                    <span>DOI Link</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                <button
                  onClick={() => setActiveBibtex({ title: pub.title, bibtex: generateGenericBibtex(pub) })}
                  className="px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 hover:bg-sky-100 hover:text-sky-800 text-xs font-bold transition-colors inline-flex items-center gap-1"
                >
                  <Quote size={12} />
                  <span>BibTeX</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Activities & Workshop Spotlight Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-sky-200/80 bg-gradient-to-br from-white via-sky-50/50 to-blue-50/30 p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-sky-100/80">
            <div>
              <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1">
                <Camera size={13} /> Activities Record
              </span>
              <h2 className="font-['Sora'] text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                Workshop Hosting & Conference Volunteering
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1"
            >
              View event photos &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {eventsGallery.map((event) => (
              <Link
                key={event.id}
                to="/gallery"
                className="group rounded-xl border border-sky-100/90 bg-white/90 p-4.5 hover:bg-sky-50/40 hover:border-sky-300 shadow-2xs hover:shadow-sky-100/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                      {event.role}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{event.period}</span>
                  </div>
                  <h3 className="font-['Sora'] text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 font-normal line-clamp-2">{event.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3.5 pt-2.5 border-t border-sky-100">
                  {event.images.map((imgSrc, idx) => (
                    <div key={idx} className="h-16 rounded-lg overflow-hidden bg-sky-100">
                      <img src={getAssetUrl(imgSrc)} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BibTeX Modal */}
      {activeBibtex && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-sky-200 shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-sky-100">
              <div>
                <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-wider">BibTeX Citation</span>
                <h3 className="font-['Sora'] font-bold text-slate-900 text-base line-clamp-1">{activeBibtex.title}</h3>
              </div>
              <button
                onClick={() => setActiveBibtex(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto text-xs font-mono text-sky-200 leading-relaxed max-h-60 border border-slate-800">
              <pre>{activeBibtex.bibtex}</pre>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                onClick={() => setActiveBibtex(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleCopyModalBibtex}
                className="px-4 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
              >
                {modalCopied ? <Check size={14} /> : <Copy size={14} />}
                <span>{modalCopied ? 'Copied!' : 'Copy BibTeX'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
