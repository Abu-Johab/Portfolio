import { Bell, Newspaper, Sparkles, Award, BookOpen, Database, Calendar } from 'lucide-react';

interface NewsItem {
  date: string;
  category: 'Publication' | 'Event' | 'Dataset' | 'Certification';
  title: string;
  description: string;
  link?: string;
  badgeColor: string;
}

const newsData: NewsItem[] = [
  {
    date: 'Mar 2026',
    category: 'Dataset',
    title: 'UAV-Gait50 Dataset Released on Mendeley Data',
    description: 'Published multi-view drone silhouette dataset for aerial gait recognition research.',
    link: 'https://doi.org/10.17632/rkkc7d4pdk.1',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    date: 'Feb 2026',
    category: 'Publication',
    title: 'SN Computer Science Journal Paper Published',
    description: 'Journal paper on Bengali Literary Style Transfer using BERT-GAN published by Springer.',
    link: 'https://doi.org/10.1007/s42979-026-04943-4',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    date: 'Feb 2026',
    category: 'Event',
    title: 'PECCII 2026 International Conference Volunteer',
    description: 'Served as student volunteer managing technical sessions and international delegate logistics.',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    date: 'Sep 2026',
    category: 'Certification',
    title: 'Completed UNSSC & UNEP Data Sharing Course',
    description: 'Awarded certificate on Effective Data Sharing for Sustainable Development by United Nations System Staff College.',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
];

export default function NewsTimeline() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
      <div className="rounded-2xl sm:rounded-3xl border border-sky-200/80 bg-gradient-to-br from-white via-sky-50/50 to-blue-50/30 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-sky-100/80">
          <div>
            <span className="font-['Sora'] text-sky-700 text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles size={14} className="text-sky-600" /> News & Announcements
            </span>
            <h2 className="font-['Sora'] text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              Recent Academic Highlights
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-semibold bg-white/80 px-3 py-1 rounded-full border border-sky-100 hidden sm:inline-block">Updated 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newsData.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl border border-sky-100/90 bg-white/90 hover:bg-sky-50/60 hover:border-sky-300 hover:shadow-sky-100/60 shadow-2xs transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Calendar size={12} className="text-sky-600" /> {item.date}
                  </span>
                </div>
                <h3 className="font-['Sora'] text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.description}</p>
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 pt-2 text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1"
                >
                  View details &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
