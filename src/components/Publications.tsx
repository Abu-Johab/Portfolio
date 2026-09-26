import { useState } from 'react';
import { publications, underReview, datasetCreations, Publication, Manuscript, DatasetCreation } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeading } from './About';
import { BookOpen, FileText, ExternalLink, Clock, Database } from 'lucide-react';

type FilterType = 'All' | 'Published' | 'Under Review' | 'Dataset Creations';

export default function Publications() {
  const ref = useReveal<HTMLElement>();
  const [filter, setFilter] = useState<FilterType>('All');

  const grandTotal = publications.length + underReview.length + datasetCreations.length;

  return (
    <section id="publications" ref={ref} className="py-24 px-5 bg-slate-100/70">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading index="06" title="Publications & Dataset Creations" />

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-2xs shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setFilter('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'All'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              All ({grandTotal})
            </button>
            <button
              onClick={() => setFilter('Published')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'Published'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Published ({publications.length})
            </button>
            <button
              onClick={() => setFilter('Under Review')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'Under Review'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Under Review ({underReview.length})
            </button>
            <button
              onClick={() => setFilter('Dataset Creations')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'Dataset Creations'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Dataset Creations ({datasetCreations.length})
            </button>
          </div>
        </div>

        <div className="space-y-6 mt-12">
          {/* Published Publications */}
          {(filter === 'All' || filter === 'Published') && (
            <div className="space-y-4">
              {filter === 'All' && (
                <h3 className="font-['Sora'] text-base font-bold text-slate-800 mb-2">
                  Peer-Reviewed Publications ({publications.length})
                </h3>
              )}
              {publications.map((pub: Publication, i: number) => (
                <article
                  key={pub.title + i}
                  className="reveal rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs hover:shadow-md hover:border-sky-400/60 transition-all duration-300"
                  style={{ transitionDelay: `${(i % 10) * 40}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                              pub.type === 'Journal'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-sky-50 text-sky-700 border-sky-200'
                            }`}
                          >
                            {pub.type}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">{pub.year}</span>
                        </div>

                        <h3 className="font-['Sora'] text-base font-bold text-slate-900 leading-snug">
                          {pub.title}
                        </h3>
                        <p className="text-sm text-slate-600 font-medium mt-1.5">{pub.authors}</p>
                        <p className="text-xs text-sky-700 mt-2 font-semibold">{pub.venue}</p>
                      </div>
                    </div>

                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-sky-700 hover:border-sky-400 hover:bg-sky-50 transition-colors shrink-0 shadow-2xs"
                        title="View publication DOI"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Under Review Manuscripts */}
          {(filter === 'All' || filter === 'Under Review') && (
            <div className="space-y-4 pt-4">
              <h3 className="font-['Sora'] text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Clock size={18} className="text-amber-600" /> Manuscripts Under Review ({underReview.length})
              </h3>
              {underReview.map((ms: Manuscript, i: number) => (
                <article
                  key={ms.title + i}
                  className="reveal rounded-2xl border border-amber-200/90 bg-white p-6 shadow-2xs hover:shadow-md transition-all duration-300"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          {ms.status}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{ms.year}</span>
                      </div>

                      <h3 className="font-['Sora'] text-base font-bold text-slate-900 leading-snug">
                        {ms.title}
                      </h3>
                      <p className="text-sm text-slate-600 font-medium mt-1.5">{ms.authors}</p>
                      <p className="text-xs text-amber-800 mt-2 font-semibold">
                        Submitted to <span className="italic">{ms.journal}</span>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Dataset Creations */}
          {(filter === 'All' || filter === 'Dataset Creations') && (
            <div className="space-y-4 pt-4">
              <h3 className="font-['Sora'] text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Database size={18} className="text-indigo-600" /> Dataset Creations & Releases ({datasetCreations.length})
              </h3>
              {datasetCreations.map((ds: DatasetCreation, i: number) => (
                <article
                  key={ds.title + i}
                  className="reveal rounded-2xl border border-indigo-200/90 bg-white p-6 shadow-2xs hover:shadow-md transition-all duration-300"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Database size={20} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                            Dataset Creation ({ds.publisher} {ds.version})
                          </span>
                          <span className="text-xs font-semibold text-slate-500">{ds.date}</span>
                        </div>

                        <h3 className="font-['Sora'] text-base font-bold text-slate-900 leading-snug">
                          {ds.title}
                        </h3>
                        <p className="text-sm text-slate-600 font-medium mt-1.5">{ds.authors}</p>
                        <p className="text-xs text-indigo-700 mt-2 font-semibold">
                          Released on {ds.publisher}, {ds.version} · DOI: {ds.doi}
                        </p>
                      </div>
                    </div>

                    {ds.url && (
                      <a
                        href={ds.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-indigo-700 hover:border-indigo-400 hover:bg-indigo-50 transition-colors shrink-0 shadow-2xs"
                        title="View dataset on Mendeley Data"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
