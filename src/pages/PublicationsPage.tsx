import { useState } from 'react';
import { publications, underReview, datasetCreations, Publication, Manuscript, DatasetCreation } from '@/data/portfolio';
import { BookOpen, FileText, ExternalLink, Search, Clock, Database, CheckCircle2, Quote, Copy, Check, X } from 'lucide-react';

type FilterType = 'All' | 'Journals' | 'Conferences' | 'Under Review' | 'Dataset Creations';

export default function PublicationsPage() {
  const [filter, setFilter] = useState<FilterType>('All');
  const [search, setSearch] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeBibtex, setActiveBibtex] = useState<{ title: string; bibtex: string } | null>(null);
  const [modalCopied, setModalCopied] = useState(false);

  // Combine items for unified filtering or render per type
  const journalList = publications.filter((p) => p.type === 'Journal');
  const confList = publications.filter((p) => p.type === 'Conference');

  const totalPublished = publications.length;
  const totalUnderReview = underReview.length;
  const totalDatasets = datasetCreations.length;
  const grandTotal = totalPublished + totalUnderReview + totalDatasets;

  // Search matching functions
  const matchQuery = (text: string) => text.toLowerCase().includes(search.toLowerCase());

  const filteredPublished = publications.filter((pub) => {
    if (filter === 'Journals' && pub.type !== 'Journal') return false;
    if (filter === 'Conferences' && pub.type !== 'Conference') return false;
    if (filter === 'Under Review' || filter === 'Dataset Creations') return false;
    if (!search) return true;
    return matchQuery(pub.title) || matchQuery(pub.authors) || matchQuery(pub.venue) || matchQuery(pub.year);
  });

  const filteredUnderReview = underReview.filter((ms) => {
    if (filter === 'Journals' || filter === 'Conferences' || filter === 'Dataset Creations') return false;
    if (!search) return true;
    return matchQuery(ms.title) || matchQuery(ms.authors) || matchQuery(ms.journal) || matchQuery(ms.year);
  });

  const filteredDatasets = datasetCreations.filter((ds) => {
    if (filter === 'Journals' || filter === 'Conferences' || filter === 'Under Review') return false;
    if (!search) return true;
    return matchQuery(ds.title) || matchQuery(ds.datasetName) || matchQuery(ds.authors) || matchQuery(ds.publisher) || matchQuery(ds.doi);
  });

  const displayCount = filteredPublished.length + filteredUnderReview.length + filteredDatasets.length;

  const handleCopyBibtex = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const generateGenericBibtex = (pub: Publication) => {
    const key = pub.authors.split(',')[0].toLowerCase().replace(/\s+/g, '') + pub.year;
    return `@inproceedings{${key},
  title={${pub.title}},
  author={${pub.authors}},
  booktitle={${pub.venue}},
  year={${pub.year}}${pub.doi ? `,\n  doi={${pub.doi}}` : ''}
}`;
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 bg-gradient-to-b from-sky-50/50 via-blue-50/30 to-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/90 border border-sky-200 text-sky-900 text-xs font-bold mb-3 shadow-2xs">
            <BookOpen size={14} className="text-sky-600" /> Peer-Reviewed Research & Datasets
          </div>
          <h1 className="font-['Sora'] text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Publications & Dataset Releases
          </h1>
          <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-3xl font-normal leading-relaxed">
            Comprehensive repository of 13 peer-reviewed published papers (SN Computer Science journal & IEEE/Springer conferences), 5 under-review journal manuscripts, and 2 dataset creations released on Mendeley Data.
          </p>
        </div>

        {/* Controls Bar: Search + Category Filters */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6 sm:mb-8 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-sky-200/80 shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-600" />
            <input
              type="text"
              placeholder="Search title, author, journal, venue, or DOI..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-sky-50/50 border border-sky-200/70 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-sky-100/70 p-1 rounded-xl shrink-0 overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter('All')}
              className={`px-3 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all ${
                filter === 'All'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-sky-900 hover:text-sky-950 hover:bg-white/80'
              }`}
            >
              All ({grandTotal})
            </button>
            <button
              onClick={() => setFilter('Journals')}
              className={`px-3 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all ${
                filter === 'Journals'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-sky-900 hover:text-sky-950 hover:bg-white/80'
              }`}
            >
              Journals ({journalList.length})
            </button>
            <button
              onClick={() => setFilter('Conferences')}
              className={`px-3 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all ${
                filter === 'Conferences'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-sky-900 hover:text-sky-950 hover:bg-white/80'
              }`}
            >
              Conferences ({confList.length})
            </button>
            <button
              onClick={() => setFilter('Under Review')}
              className={`px-3 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all ${
                filter === 'Under Review'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-sky-900 hover:text-sky-950 hover:bg-white/80'
              }`}
            >
              Under Review ({totalUnderReview})
            </button>
            <button
              onClick={() => setFilter('Dataset Creations')}
              className={`px-3 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all ${
                filter === 'Dataset Creations'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-sky-900 hover:text-sky-950 hover:bg-white/80'
              }`}
            >
              Datasets ({totalDatasets})
            </button>
          </div>
        </div>

        {/* Results Count Header */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-6 px-1">
          <span>Showing {displayCount} results</span>
          {search && (
            <button onClick={() => setSearch('')} className="text-sky-700 hover:underline">
              Clear search filter
            </button>
          )}
        </div>

        {displayCount === 0 ? (
          <div className="rounded-2xl sm:rounded-3xl border border-dashed border-sky-300 bg-white/90 p-8 sm:p-12 text-center shadow-2xs">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4">
              <BookOpen size={28} />
            </div>
            <h3 className="font-['Sora'] text-base sm:text-lg font-bold text-slate-900 mb-2">No matching items found</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-normal">
              Try adjusting your search keywords or switching category filters.
            </p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {/* Published Publications List */}
            {filteredPublished.length > 0 && (
              <div className="space-y-3.5 sm:space-y-4">
                {(filter === 'All' || filter === 'Journals' || filter === 'Conferences') && filter === 'All' && (
                  <h2 className="font-['Sora'] text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-blue-600 shrink-0" /> Peer-Reviewed Publications ({filteredPublished.length})
                  </h2>
                )}
                {filteredPublished.map((pub: Publication, i: number) => {
                  const bibContent = pub.bibtex || generateGenericBibtex(pub);
                  return (
                    <article
                      key={pub.title + i}
                      className="rounded-2xl border border-sky-200/80 bg-white/95 p-4 sm:p-6 shadow-2xs hover:shadow-sky-100/70 hover:border-sky-400 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                            <FileText size={20} />
                          </div>
                          <div className="min-w-0 flex-1">
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
                              <span className="text-xs font-bold text-slate-500">{pub.year}</span>
                            </div>

                            <h3 className="font-['Sora'] text-base sm:text-lg font-bold text-slate-900 leading-snug">
                              {pub.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">{pub.authors}</p>
                            <p className="text-xs text-sky-800 mt-2 font-semibold">{pub.venue}</p>

                            {pub.doi && (
                              <p className="text-[11px] text-slate-500 font-mono mt-2 break-all">
                                DOI: {pub.doi}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center gap-2 shrink-0 self-start">
                          {pub.url && (
                            <a
                              href={pub.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl border border-sky-200 bg-sky-50/80 text-xs font-bold text-sky-800 hover:bg-sky-600 hover:text-white transition-all shadow-2xs inline-flex items-center gap-1.5"
                              title="View publication DOI"
                            >
                              <span>DOI Link</span>
                              <ExternalLink size={13} />
                            </a>
                          )}

                          <button
                            onClick={() => setActiveBibtex({ title: pub.title, bibtex: bibContent })}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-100/80 text-xs font-bold text-slate-700 hover:bg-sky-100 hover:text-sky-800 transition-all shadow-2xs inline-flex items-center gap-1.5"
                            title="View BibTeX Citation"
                          >
                            <Quote size={13} /> Cite / BibTeX
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Manuscripts Under Review List */}
            {filteredUnderReview.length > 0 && (
              <div className="space-y-3.5 sm:space-y-4 pt-4">
                <h2 className="font-['Sora'] text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Clock size={18} className="text-amber-600 shrink-0" /> Manuscripts Under Review ({filteredUnderReview.length})
                </h2>
                {filteredUnderReview.map((ms: Manuscript, i: number) => (
                  <article
                    key={ms.title + i}
                    className="rounded-2xl border border-amber-200/90 bg-gradient-to-r from-amber-50/40 via-sky-50/20 to-white p-4 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Clock size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                            {ms.status}
                          </span>
                          <span className="text-xs font-bold text-slate-500">{ms.year}</span>
                        </div>

                        <h3 className="font-['Sora'] text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {ms.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">{ms.authors}</p>
                        <p className="text-xs text-amber-800 mt-2 font-semibold">
                          Submitted to <span className="italic">{ms.journal}</span>
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Dataset Creations List */}
            {filteredDatasets.length > 0 && (
              <div className="space-y-3.5 sm:space-y-4 pt-4">
                <h2 className="font-['Sora'] text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Database size={18} className="text-indigo-600 shrink-0" /> Dataset Creations & Releases ({filteredDatasets.length})
                </h2>
                {filteredDatasets.map((ds: DatasetCreation, i: number) => (
                  <article
                    key={ds.title + i}
                    className="rounded-2xl border border-indigo-200/90 bg-gradient-to-r from-indigo-50/40 via-sky-50/20 to-white p-4 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-100/80 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <Database size={20} />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300">
                              Dataset Creation ({ds.publisher} {ds.version})
                            </span>
                            <span className="text-xs font-bold text-slate-500">{ds.date}</span>
                          </div>

                          <h3 className="font-['Sora'] text-base sm:text-lg font-bold text-slate-900 leading-snug">
                            {ds.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">{ds.authors}</p>
                          <p className="text-xs text-indigo-800 mt-2 font-semibold">
                            Released on {ds.publisher}, {ds.version}
                          </p>
                          {ds.doi && (
                            <p className="text-[11px] text-slate-500 font-mono mt-2 break-all">
                              DOI: {ds.doi}
                            </p>
                          )}
                        </div>
                      </div>

                      {ds.url && (
                        <a
                          href={ds.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-indigo-200 bg-indigo-50 text-xs font-semibold text-indigo-800 hover:bg-indigo-100 hover:border-indigo-400 transition-all shrink-0 shadow-2xs inline-flex items-center gap-1.5 self-start sm:self-auto"
                          title="View dataset on Mendeley Data"
                        >
                          <span>View Dataset</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* BibTeX Citation Modal */}
      {activeBibtex && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => {
            setActiveBibtex(null);
            setModalCopied(false);
          }}
        >
          <div
            className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Quote size={14} /> BibTeX Academic Citation
                </span>
                <h3 className="font-['Sora'] text-base sm:text-lg font-bold text-slate-900 mt-1 line-clamp-2">
                  {activeBibtex.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setActiveBibtex(null);
                  setModalCopied(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <div className="my-5 relative">
              <pre className="p-4 rounded-2xl bg-slate-900 text-sky-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 selection:bg-sky-500/30">
                {activeBibtex.bibtex}
              </pre>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeBibtex.bibtex);
                  setModalCopied(true);
                  setTimeout(() => setModalCopied(false), 2000);
                }}
                className="px-5 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-all shadow-2xs inline-flex items-center gap-2"
              >
                {modalCopied ? (
                  <>
                    <Check size={16} /> Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Copy BibTeX Code
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
