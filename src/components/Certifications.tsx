import { useState } from 'react';
import { certifications, Certification } from '@/data/portfolio';
import { getAssetUrl } from '@/utils/assets';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeading } from './About';
import { Award, BadgeCheck, ExternalLink, Image as ImageIcon, Mic, FileText, X, Download } from 'lucide-react';

type FilterType = 'All' | 'Professional' | 'Oral Presentation';

export default function Certifications() {
  const ref = useReveal<HTMLElement>();
  const [filter, setFilter] = useState<FilterType>('All');
  const [activePdfModal, setActivePdfModal] = useState<{ title: string; pdfUrl: string } | null>(null);
  const [activeImageModal, setActiveImageModal] = useState<{ title: string; imageUrl: string; rotation: number } | null>(null);

  const rotateImage = () => {
    if (activeImageModal) {
      setActiveImageModal({
        ...activeImageModal,
        rotation: (activeImageModal.rotation + 90) % 360,
      });
    }
  };

  const filteredCerts = filter === 'All'
    ? certifications
    : certifications.filter((c) => c.category === filter);

  const profCount = certifications.filter((c) => c.category === 'Professional').length;
  const oralCount = certifications.filter((c) => c.category === 'Oral Presentation').length;

  return (
    <section id="certifications" ref={ref} className="py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-sky-50/40 via-blue-50/20 to-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <SectionHeading index="07" title="Certifications & Achievements" />
            <p className="text-sm text-slate-600 mt-2 font-normal max-w-2xl">
              Professional credentials issued by UNSSC, UNEP, DeepLearning.AI, Stanford Online, ICT Division EDGE Project, and oral presentation certificates at IEEE & Springer international conferences.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-sky-200/80 shadow-2xs shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setFilter('All')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'All'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-sky-900 hover:text-sky-950 hover:bg-sky-50'
              }`}
            >
              All ({certifications.length})
            </button>
            <button
              onClick={() => setFilter('Professional')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'Professional'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-sky-900 hover:text-sky-950 hover:bg-sky-50'
              }`}
            >
              Professional ({profCount})
            </button>
            <button
              onClick={() => setFilter('Oral Presentation')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'Oral Presentation'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-sky-900 hover:text-sky-950 hover:bg-sky-50'
              }`}
            >
              Oral Presentations ({oralCount})
            </button>
          </div>
        </div>

        {filteredCerts.length === 0 ? (
          <div className="reveal mt-12 rounded-3xl border border-dashed border-sky-300 bg-white/90 p-12 text-center shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4">
              <Award size={24} />
            </div>
            <h3 className="font-['Sora'] text-base font-bold text-slate-900 mb-2">No certificates found</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto font-normal">
              No certifications match the selected filter category.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredCerts.map((cert: Certification, i: number) => (
              <article
                key={cert.name + i}
                className="reveal flex flex-col justify-between rounded-3xl border border-sky-200/80 bg-white/95 p-6 shadow-2xs hover:shadow-sky-100/80 hover:border-sky-300 transition-all duration-300 group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div>
                  {/* Certificate Image / PDF Preview Banner */}
                  <div className="relative w-full h-52 mb-5 rounded-2xl overflow-hidden border border-sky-200/80 bg-slate-900/5 group-hover:border-sky-300 transition-colors">
                    {cert.image ? (
                      <div
                        onClick={() => setActiveImageModal({ title: cert.name, imageUrl: cert.image!, rotation: 0 })}
                        className="w-full h-full relative cursor-pointer group/img overflow-hidden flex items-center justify-center bg-slate-100/80 p-1.5"
                      >
                        <img
                          src={getAssetUrl(cert.image)}
                          alt={cert.name}
                          className="w-full h-full object-contain rounded-lg group-hover/img:scale-102 transition-transform duration-300 shadow-2xs"
                        />
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                          <span className="px-4 py-2 rounded-full bg-white text-slate-900 text-xs font-extrabold shadow-lg flex items-center gap-2">
                            <ImageIcon size={16} className="text-sky-600" /> View & Expand Certificate
                          </span>
                        </div>
                      </div>
                    ) : cert.pdf ? (
                      <div
                        onClick={() => setActivePdfModal({ title: cert.name, pdfUrl: cert.pdf! })}
                        className="w-full h-full bg-gradient-to-br from-slate-900 via-sky-950 to-blue-950 text-white flex flex-col items-center justify-center p-4 text-center cursor-pointer relative overflow-hidden group/pdf"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-300 flex items-center justify-center mb-2 group-hover/pdf:scale-110 group-hover/pdf:bg-sky-500 group-hover/pdf:text-white transition-all duration-300 shadow-md">
                          <FileText size={24} />
                        </div>
                        <span className="text-xs font-bold font-['Sora'] tracking-tight flex items-center gap-1.5 text-sky-200">
                          Verified PDF Certificate
                        </span>
                        <span className="text-[11px] text-slate-300 font-semibold mt-2 inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/10 group-hover/pdf:bg-white/20 transition-colors">
                          Preview Certificate Document &rarr;
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-sky-50 via-blue-50/60 to-slate-100 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                        <div className="w-12 h-12 rounded-2xl bg-white/90 text-sky-600 shadow-2xs flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                          {cert.category === 'Oral Presentation' ? <Mic size={24} /> : <Award size={24} />}
                        </div>
                        <span className="text-xs font-bold text-slate-800 font-['Sora']">
                          {cert.category === 'Oral Presentation' ? 'IEEE / Springer Oral Certificate' : 'Professional Record'}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium mt-1">
                          Official Certificate Recorded
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details Header */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0">
                        {cert.category === 'Oral Presentation' ? <Mic size={15} /> : <BadgeCheck size={16} />}
                      </div>
                      <span className="text-xs font-bold text-slate-700">{cert.issuer}</span>
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 shrink-0">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="font-['Sora'] text-base font-extrabold text-slate-900 leading-snug">{cert.name}</h3>

                  {cert.credentialId && (
                    <p className="text-[11px] font-mono text-slate-600 mt-2 bg-sky-50/70 px-2.5 py-1 rounded-lg border border-sky-200/60 inline-block font-semibold">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}

                  {cert.description && (
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed font-normal">
                      {cert.description}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-sky-100 flex items-center justify-between gap-2">
                  {cert.image ? (
                    <button
                      onClick={() => setActiveImageModal({ title: cert.name, imageUrl: cert.image!, rotation: 0 })}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-all shadow-xs"
                    >
                      <ImageIcon size={14} /> View Certificate
                    </button>
                  ) : cert.pdf ? (
                    <button
                      onClick={() => setActivePdfModal({ title: cert.name, pdfUrl: cert.pdf! })}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-all shadow-xs"
                    >
                      <FileText size={14} /> Open PDF Preview
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500 inline-flex items-center gap-1">
                      <BadgeCheck size={14} className="text-sky-600" /> Verified Record
                    </span>
                  )}

                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900 transition-colors ml-auto"
                    >
                      Verify Online <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Image Lightbox Modal Viewer */}
      {activeImageModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveImageModal(null)}
        >
          <div
            className="relative bg-slate-900 text-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center">
                  <ImageIcon size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Official Certificate Record</span>
                  <h4 className="text-base font-bold text-white font-['Sora'] line-clamp-1">{activeImageModal.title}</h4>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={rotateImage}
                  className="px-3 py-1.5 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 text-sky-300 border border-sky-500/40 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                  title="Rotate 90 degrees"
                >
                  <span className="text-sm">🔄</span> Rotate ({activeImageModal.rotation}°)
                </button>
                <a
                  href={getAssetUrl(activeImageModal.imageUrl)}
                  download
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 border border-slate-700"
                >
                  <Download size={14} /> Download
                </a>
                <button
                  onClick={() => setActiveImageModal(null)}
                  className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors ml-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="relative w-full h-[70vh] bg-black flex items-center justify-center p-4 overflow-hidden select-none">
              <img
                src={getAssetUrl(activeImageModal.imageUrl)}
                alt={activeImageModal.title}
                style={{ transform: `rotate(${activeImageModal.rotation}deg)` }}
                className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      )}

      {/* PDF Modal Viewer */}
      {activePdfModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-4 shrink-0 bg-slate-50">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-['Sora'] font-bold text-slate-900 text-sm sm:text-base truncate">
                    {activePdfModal.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Official Certificate PDF Document</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={getAssetUrl(activePdfModal.pdfUrl)}
                  download
                  className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <Download size={14} /> Download
                </a>
                <a
                  href={getAssetUrl(activePdfModal.pdfUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <ExternalLink size={14} /> Open in New Tab
                </a>
                <button
                  onClick={() => setActivePdfModal(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors ml-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe / Viewer */}
            <div className="flex-1 bg-slate-900 relative">
              <iframe
                src={getAssetUrl(activePdfModal.pdfUrl)}
                title={activePdfModal.title}
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
