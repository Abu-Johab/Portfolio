import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navItems } from '@/data/portfolio';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-sky-200/80 shadow-xs shadow-sky-100/40 py-3'
          : 'bg-white/80 backdrop-blur-xs border-b border-sky-100/60 py-4'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-['Sora'] font-extrabold text-sm flex items-center justify-center shadow-xs shadow-sky-200">
            J
          </span>
          <span className="font-['Sora'] font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-sky-600 transition-colors">
            Md. Abu Johab
          </span>
        </Link>

        {/* Minimalist Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 sm:gap-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all rounded-xl ${
                  isActive
                    ? 'text-sky-800 bg-sky-100/80 border border-sky-200/80 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50/70'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-700 p-2 rounded-xl hover:bg-sky-50 hover:text-sky-700 transition-colors border border-transparent hover:border-sky-200/60"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-sky-200 shadow-xl p-4 animate-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`w-full block px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                      isActive
                        ? 'text-sky-800 bg-sky-100/80 border border-sky-200/80 font-bold'
                        : 'text-slate-700 hover:bg-sky-50 hover:text-sky-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
