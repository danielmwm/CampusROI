import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Logo = ({ light }) => (
  <Link to="/" className="flex items-center gap-2.5 group">
    <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-300 ${
      light ? 'bg-white/10 border border-white/20' : 'bg-brand/10 border border-brand/20'
    }`}>
      <svg className={`w-3.5 h-3.5 transition-colors duration-300 ${light ? 'text-white' : 'text-brand'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    </div>
    <span className={`font-medium text-[15px] tracking-tight transition-colors duration-300 ${light ? 'text-white' : 'text-black'}`}>
      CampusROI
    </span>
  </Link>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Light (transparent + white text) only on the home hero before scrolling
  const light = isHome && !scrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      light
        ? 'bg-transparent'
        : 'bg-white/95 backdrop-blur-sm border-b border-black/[0.06]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <Logo light={light} />

          {/* Centered links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            {[
              { to: '/calculator', label: 'Calculator' },
              { to: '/compare', label: 'Compare' },
              { to: '/methodology', label: 'Methodology' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                    light
                      ? isActive
                        ? 'text-white bg-white/15'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                      : isActive
                        ? 'text-black bg-neutral-100'
                        : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden md:block">
            <Link
              to="/calculator"
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                light
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-black text-white hover:bg-neutral-800'
              }`}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              light ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/5'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className={`md:hidden border-t pb-6 pt-4 ${
            light
              ? 'border-white/10 bg-black/90 backdrop-blur-xl'
              : 'border-black/[0.06] bg-white'
          }`}>
            <div className="flex flex-col gap-1">
              {[
                { to: '/calculator', label: 'Calculator' },
                { to: '/compare', label: 'Compare' },
                { to: '/methodology', label: 'Methodology' },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? light ? 'text-white bg-white/10' : 'text-black bg-neutral-100'
                        : light ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/calculator"
                className={`mt-3 mx-4 px-6 py-3 rounded-full text-sm font-medium text-center ${
                  light ? 'bg-white text-black' : 'bg-black text-white'
                }`}
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
