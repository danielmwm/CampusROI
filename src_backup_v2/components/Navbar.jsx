import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5 group">
    <div className="w-8 h-8 bg-brand/10 border border-brand/25 rounded-xl flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-200">
      <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    </div>
    <span className="text-white font-bold text-[15px] tracking-tight">CampusROI</span>
  </Link>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const desktopLink = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 ${isActive ? 'text-brand' : 'text-slate-400 hover:text-white'}`;

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${
        scrolled
          ? 'bg-[#080E1A]/90 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/30'
          : 'bg-[#080E1A] border-white/[0.07]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/calculator" className={desktopLink}>Calculator</NavLink>
            <NavLink to="/compare" className={desktopLink}>Compare</NavLink>
            <NavLink to="/methodology" className={desktopLink}>Methodology</NavLink>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              to="/calculator"
              className="bg-brand hover:bg-brand-600 text-white text-xs font-bold px-5 py-2 rounded-lg transition-colors uppercase tracking-wider shadow-brand-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 pt-3 pb-5 animate-fade-in">
            <div className="flex flex-col gap-0.5">
              {[
                { to: '/calculator', label: 'Calculator' },
                { to: '/compare', label: 'Compare' },
                { to: '/methodology', label: 'Methodology' },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `text-sm font-medium px-3 py-2.5 rounded-lg transition-colors ${
                      isActive ? 'text-brand bg-brand/5' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/calculator"
                className="mt-3 bg-brand text-white text-sm font-bold px-4 py-2.5 rounded-lg text-center uppercase tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
