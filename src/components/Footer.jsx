import { Link } from 'react-router-dom';

const FooterLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 bg-brand/20 border border-brand/30 rounded flex items-center justify-center">
      <svg className="w-3 h-3 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    </div>
    <span className="text-white font-medium text-sm tracking-tight">CampusROI</span>
  </div>
);

const footerLink = 'text-xs text-neutral-500 hover:text-neutral-300 transition-colors';

export default function Footer() {
  return (
    <footer className="bg-[#171717] mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2">
            <FooterLogo />
            <p className="text-neutral-600 text-xs leading-relaxed mt-4 max-w-xs">
              The financial return calculator for Canadian university programs. Free, data-driven, no account required.
            </p>
            <a
              href="https://github.com/campusroi"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>

          {/* Tools */}
          <div>
            <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-[0.2em] mb-5">Tools</p>
            <div className="space-y-3">
              <Link to="/calculator" className={footerLink}>ROI Calculator</Link>
              <br />
              <Link to="/compare" className={footerLink}>Compare Programs</Link>
              <br />
              <Link to="/methodology" className={footerLink}>Methodology</Link>
            </div>
          </div>

          {/* Data */}
          <div className="col-span-2">
            <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-[0.2em] mb-5">Data Sources</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {[
                'Statistics Canada LFS',
                'CMHC Rental Market Report',
                'OUAC Graduate Outcomes',
                'Engineers Canada Survey',
                'UW Co-op Employment Report',
                'CPA Canada Compensation Study',
              ].map((s) => (
                <p key={s} className="text-xs text-neutral-600">{s}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-neutral-700 text-xs">© 2025 CampusROI · MIT License · Updated Jan & Jul annually</p>
          <p className="text-neutral-700 text-xs">Estimates only. Not financial advice.</p>
        </div>
      </div>
    </footer>
  );
}
