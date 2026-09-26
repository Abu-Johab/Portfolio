import { useState } from 'react';
import { eventsGallery, EventItem } from '@/data/portfolio';
import { getAssetUrl } from '@/utils/assets';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeading } from './About';
import { MapPin, Calendar, X, ZoomIn, ChevronLeft, ChevronRight, Images, Sparkles } from 'lucide-react';

export default function EventGallery() {
  const ref = useReveal<HTMLElement>();
  const [activeLightbox, setActiveLightbox] = useState<{
    event: EventItem;
    photoIndex: number;
  } | null>(null);

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeLightbox) return;
    const total = activeLightbox.event.images.length;
    const nextIdx = (activeLightbox.photoIndex - 1 + total) % total;
    setActiveLightbox({ ...activeLightbox, photoIndex: nextIdx });
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeLightbox) return;
    const total = activeLightbox.event.images.length;
    const nextIdx = (activeLightbox.photoIndex + 1) % total;
    setActiveLightbox({ ...activeLightbox, photoIndex: nextIdx });
  };

  return (
    <section id="gallery" ref={ref} className="py-20 px-4 sm:px-6 bg-gradient-to-b from-slate-50 via-sky-50/40 to-blue-50/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <SectionHeading index="09" title="Activities & Event Gallery" />
            <p className="text-sm text-slate-600 mt-2 max-w-2xl font-normal">
              Highlights and photo records from workshop hosting at PUST and volunteering at PECCII 2026 international conference.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-100/90 border border-sky-200 text-sky-900 text-xs font-bold shrink-0 self-start sm:self-auto shadow-2xs">
            <Images size={16} className="text-sky-600" />
            <span>2 Major Event Sections · 5 Event Photos</span>
          </div>
        </div>

        {/* 2 Main Event Sections */}
        <div className="space-y-12">
          {eventsGallery.map((event, eventIdx) => (
            <article
              key={event.id}
              className="reveal rounded-3xl border border-sky-200/80 bg-white/95 overflow-hidden shadow-xs hover:shadow-sky-100/70 hover:border-sky-300 transition-all duration-300 p-6 sm:p-8"
              style={{ transitionDelay: `${eventIdx * 120}ms` }}
            >
              {/* Event Header & Badge */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-sky-100">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border shadow-2xs ${
                        event.category === 'Workshop'
                          ? 'bg-sky-100/90 text-sky-900 border-sky-200'
                          : 'bg-blue-100/90 text-blue-900 border-blue-200'
                      }`}
                    >
                      {event.role}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-100 flex items-center gap-1">
                      <Sparkles size={12} className="text-sky-600" />
                      {event.images.length} Event Photos
                    </span>
                  </div>

                  <h3 className="font-['Sora'] text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-sm font-bold text-sky-700">{event.organization}</p>
                </div>

                <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs font-semibold text-slate-600 shrink-0">
                  {event.location && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-50/80 border border-sky-200/70">
                      <MapPin size={14} className="text-sky-600" /> {event.location}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-50/80 border border-sky-200/70">
                    <Calendar size={14} className="text-sky-600" /> {event.period}
                  </span>
                </div>
              </div>

              {/* Event Description */}
              <p className="text-sm text-slate-600 font-normal leading-relaxed my-6 max-w-4xl">
                {event.description}
              </p>

              {/* Photos Grid within this single Event */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-3 flex items-center gap-1.5">
                  <Images size={14} /> Photo Gallery ({event.images.length} Photos)
                </h4>

                <div
                  className={`grid gap-4 ${
                    event.images.length === 3
                      ? 'grid-cols-1 sm:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2'
                  }`}
                >
                  {event.images.map((imgSrc, imgIdx) => (
                    <div
                      key={imgIdx}
                      onClick={() => setActiveLightbox({ event, photoIndex: imgIdx })}
                      className="group relative h-56 sm:h-64 rounded-2xl bg-slate-900 overflow-hidden cursor-pointer border border-sky-200/80 shadow-2xs hover:shadow-sky-100/70 hover:border-sky-400 transition-all duration-300"
                    >
                      <img
                        src={getAssetUrl(imgSrc)}
                        alt={`${event.title} - Photo ${imgIdx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <span className="self-start px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
                          <ZoomIn size={14} className="text-sky-600" /> View Photo {imgIdx + 1} of {event.images.length}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                        {imgIdx + 1} / {event.images.length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Screen Interactive Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative bg-slate-900 text-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Close Button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  {activeLightbox.event.role}
                </span>
                <h4 className="text-base font-bold text-white font-['Sora'] line-clamp-1">
                  {activeLightbox.event.title}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  {activeLightbox.photoIndex + 1} of {activeLightbox.event.images.length}
                </span>
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
                  aria-label="Close photo modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Photo Viewer Container with Prev / Next Buttons */}
            <div className="relative w-full h-[60vh] sm:h-[68vh] bg-black flex items-center justify-center select-none overflow-hidden">
              <img
                src={getAssetUrl(activeLightbox.event.images[activeLightbox.photoIndex])}
                alt={`Photo ${activeLightbox.photoIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              {/* Prev Button */}
              {activeLightbox.event.images.length > 1 && (
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white border border-slate-700 flex items-center justify-center transition-all shadow-lg hover:scale-110"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Next Button */}
              {activeLightbox.event.images.length > 1 && (
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white border border-slate-700 flex items-center justify-center transition-all shadow-lg hover:scale-110"
                  aria-label="Next photo"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Bottom Caption Bar */}
            <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <p className="line-clamp-1">{activeLightbox.event.organization}</p>
              <p className="shrink-0">{activeLightbox.event.period}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
