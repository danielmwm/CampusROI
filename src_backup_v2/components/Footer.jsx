import { Link } from 'react-router-dom';

const FooterLogo = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-6 h-6 bg-brand/10 border border-brand/20 rounded-lg flex items-center justify-center">
      <svg className="w-3.5 h-3.5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    </div>
    <span className="text-white font-bold text-sm tracking-tight">CampusROI</span>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-[#080E1A] border-t border-white/[0.07] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand col */}
          <div className="col-span-2">
            <FooterLogo />
            <p className="text-slate-500 text-xs leading-relaxed mt-3 max-w-xs">
              The financial return calculator for Canadian university programs. Free, data-driven, and no account required.
            </p>
            <a
              href="https://github.com/campusroi"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tools</p>
            <div className="space-y-2.5">
              <Link to="/calculator" className="block text-xs text-slate-500 hover:text-slate-300 transition-colors">ROI Calculator</Link>
              <Link to="/compare" className="block text-xs text-slate-500 hover:text-slate-300 transition-colors">Compare Programs</Link>
              <Link to="/methodology" className="block text-xs text-slate-500 hover:text-slate-300 transition-colors">Methodology</Link>
            </div>
          </div>

          {/* Data */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Data Sources</p>
            <div className="space-y-2.5 text-xs text-slate-500">
              <p>Statistics Canada LFS</p>
              <p>UW Co-op Employment Report</p>
              <p>OUAC Graduate Outcomes</p>
              <p>University Registrars</p>
              <p>CMHC Rental Market Report</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">© 2025 CampusROI · MIT License · Updated Jan & Jul annually</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
            <span className="text-xs text-slate-500">2024–25 data</span>
          </div>
        </div>
        <p className="text-slate-700 text-xs mt-4 max-w-2xl leading-relaxed">
          Estimates only. All projections use historical averages and published university data. Individual results will vary. Not financial advice.
        </p>
      </div>
    </footer>
  );
}
