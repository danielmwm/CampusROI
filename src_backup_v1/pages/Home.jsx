import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { formatCurrencyShort, formatCurrency } from '../utils/formatting';

/* ─── Static data ─────────────────────────────────────── */

const SAMPLE_CHART_DATA = [
  { name: 'Waterloo CS', value: 892000, color: '#0F172A' },
  { name: 'UofT Engineering', value: 748000, color: '#334155' },
  { name: 'McMaster Business', value: 582000, color: '#64748B' },
  { name: 'No Degree', value: 310000, color: '#CBD5E1' },
];

const UNIVERSITIES = [
  'University of Waterloo',
  'University of Toronto',
  'McGill University',
  "Queen's University",
  'UBC',
  'Western University',
  'McMaster University',
  'Toronto Metropolitan',
  'York University',
  'Carleton University',
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Pick your program',
    description: 'Choose from 10 Canadian universities and 40+ programs — CS, Engineering, Commerce, Health Sciences, and more.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Set your scenario',
    description: 'Tune co-op terms, scholarship amounts, target city, loan rate, and investment return. Every assumption is editable.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'See your ROI',
    description: 'Instantly see net degree cost, break-even year, starting salary, and 10-year net worth — all updating as you type.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

const FEATURES = [
  {
    title: 'True cost of attendance',
    description: 'We include tuition, residence, meal plan, and co-op earnings. No hidden assumptions — every number is yours to edit.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    ),
  },
  {
    title: '10-year net worth projection',
    description: 'Compare your degree path against entering the workforce immediately — with adjustable salary growth and investment returns.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    title: 'Side-by-side comparison',
    description: 'Load up to 3 programs on the same chart. See how CS stacks up against Engineering or Commerce on every metric.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
];

/* ─── Sub-components ──────────────────────────────────── */

const SampleTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-slate-700">{payload[0].payload.name}</p>
      <p className="text-slate-600 mt-0.5">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

/* Mini sparkline SVG in hero card */
function HeroSparkline() {
  return (
    <div className="border-t border-white/5 pt-4">
      <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wide">Net worth projection</p>
      <svg viewBox="0 0 280 64" className="w-full h-14" preserveAspectRatio="none">
        <defs>
          <linearGradient id="degreeGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Degree fill */}
        <path
          d="M0 62 C40 60 80 52 120 38 C160 24 200 10 280 3 L280 64 L0 64 Z"
          fill="url(#degreeGrad)"
        />
        {/* No-degree dashed line */}
        <path
          d="M0 54 C70 50 140 45 210 38 C245 35 262 33 280 30"
          fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="5 3"
        />
        {/* Degree solid line */}
        <path
          d="M0 62 C40 60 80 52 120 38 C160 24 200 10 280 3"
          fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"
        />
      </svg>
      <div className="flex gap-5 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-brand rounded-full inline-block" />
          <span className="text-xs text-slate-500">With degree</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-4 h-px inline-block rounded"
            style={{ background: 'repeating-linear-gradient(90deg,#475569 0,#475569 4px,transparent 4px,transparent 8px)' }}
          />
          <span className="text-xs text-slate-500">No degree</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ════════════ HERO ════════════ */}
      <section className="relative bg-navy overflow-hidden">
        {/* Glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% -5%, rgba(34,197,94,0.09) 0%, transparent 65%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-16 items-center">

            {/* ── Left: copy ── */}
            <div>
              {/* Eyebrow pill */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand bg-brand/10 border border-brand/20 px-3.5 py-1.5 rounded-full mb-7">
                <span className="w-1.5 h-1.5 bg-brand rounded-full" />
                Free · Built for Canadians · No account needed
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.1] text-white mb-5">
                Your degree is an<br />
                investment.{' '}
                <span className="text-brand">Know the<br className="hidden sm:block" /> return.</span>
              </h1>

              <p className="text-base text-slate-400 leading-relaxed mb-8 max-w-lg">
                CampusROI calculates the real financial return of any Canadian university program — tuition, co-op earnings, salary, and 10-year net worth — so you choose with data, not gut feeling.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  to="/calculator"
                  className="inline-flex items-center gap-2 bg-brand hover:bg-brand-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors uppercase tracking-wide shadow-brand"
                >
                  Calculate My ROI
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  to="/compare"
                  className="inline-flex items-center gap-2 text-white border border-white/20 hover:border-white/40 hover:bg-white/5 font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
                >
                  Compare Programs
                </Link>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">
                {['10 universities', '40+ programs', '2024–25 data', 'All assumptions editable'].map((item, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-slate-600 rounded-full" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right: preview card ── */}
            <div className="relative">
              <div className="bg-white/[0.045] border border-white/10 rounded-2xl p-5 backdrop-blur-sm">

                {/* Card header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Sample scenario</p>
                    <p className="text-sm font-bold text-white mt-0.5">Waterloo Computer Science · Co-op</p>
                  </div>
                  <span className="text-xs bg-brand/15 text-brand border border-brand/20 px-2.5 py-1 rounded-full font-semibold">
                    2025 → 2030
                  </span>
                </div>

                {/* Metric grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {[
                    { label: 'Net degree cost', value: '$28,400', sub: 'after co-op & aid', accent: false },
                    { label: 'Starting salary', value: '$95,000', sub: 'yr 1 post-grad', accent: false },
                    { label: 'Break-even', value: 'Year 3', sub: 'post-graduation', accent: true },
                    { label: '10-yr net worth', value: '$892K', sub: 'projected', accent: true },
                  ].map((m, i) => (
                    <div key={i} className="bg-white/[0.05] border border-white/5 rounded-xl p-3">
                      <p className="text-[10px] text-slate-500 font-medium mb-0.5">{m.label}</p>
                      <p className={`text-[17px] font-extrabold leading-tight ${m.accent ? 'text-brand' : 'text-white'}`}>
                        {m.value}
                      </p>
                      <p className="text-[10px] text-slate-600 mt-0.5">{m.sub}</p>
                    </div>
                  ))}
                </div>

                <HeroSparkline />
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-2 bg-brand text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-brand uppercase tracking-wider">
                Real-time
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ STATS BAR ════════════ */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {[
              { number: '10', label: 'Canadian universities' },
              { number: '40+', label: 'Programs covered' },
              { number: '100%', label: 'Free — always' },
              { number: '2025', label: 'Data up to date' },
            ].map((stat, i) => (
              <div key={i} className="py-8 px-6 text-center">
                <p className="text-2xl font-extrabold text-navy tracking-tight">{stat.number}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section className="bg-slate-50 border-b border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">From zero to ROI in 60 seconds</h2>
            <p className="text-slate-500 mt-3 text-sm leading-relaxed">
              No spreadsheets. No guesswork. Pick a program, tweak your scenario, get your 10-year financial picture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="relative">
                {/* Connector line on desktop */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[calc(100%-0.5rem)] w-[calc(100%-3rem)] h-px bg-slate-200" />
                )}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-navy text-brand flex items-center justify-center shrink-0 shadow-sm">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{step.step}</span>
                </div>
                <h3 className="text-base font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <section className="bg-white border-b border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">What You Get</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
              Everything you need to decide with confidence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="group p-7 border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all duration-200 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-50 group-hover:bg-navy text-slate-400 group-hover:text-brand flex items-center justify-center mb-5 transition-colors duration-200">
                  {f.icon}
                </div>
                <h3 className="text-sm font-bold text-navy mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ UNIVERSITIES ════════════ */}
      <section className="bg-slate-50 border-b border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">Coverage</p>
          <h2 className="text-2xl font-extrabold text-navy tracking-tight mb-2">10 universities. 40+ programs.</h2>
          <p className="text-sm text-slate-500 mb-8">All major Canadian schools, with programs across every faculty.</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {UNIVERSITIES.map((uni, i) => (
              <span
                key={i}
                className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-full hover:border-navy/20 hover:text-navy hover:shadow-sm transition-all duration-150 cursor-default"
              >
                {uni}
              </span>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">More schools added regularly · Updated Jan & Jul each year</p>
        </div>
      </section>

      {/* ════════════ SAMPLE CHART ════════════ */}
      <section className="bg-white border-b border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left: copy */}
            <div>
              <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">Sample Data</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-4">
                The spread is bigger than you think
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-7">
                A Waterloo CS grad's projected 10-year net worth is nearly <strong className="text-navy font-semibold">3× that of someone who skipped university</strong> — but the gap between programs is just as wide. That's exactly what CampusROI quantifies.
              </p>
              <div className="space-y-3 mb-8">
                {SAMPLE_CHART_DATA.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: d.color }} />
                      <span className="text-sm text-slate-600 font-medium">{d.name}</span>
                    </div>
                    <span className="text-sm font-bold text-navy tabular-nums">{formatCurrency(d.value)}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand hover:text-brand-600 uppercase tracking-widest transition-colors"
              >
                Calculate yours
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Right: chart */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <p className="text-xs text-slate-400 font-semibold mb-5 uppercase tracking-wide">Projected 10-Year Net Worth (CAD)</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SAMPLE_CHART_DATA} layout="vertical" margin={{ left: 4, right: 12, top: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                    <XAxis
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#94A3B8', fontSize: 11 }}
                      tickFormatter={formatCurrencyShort}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }}
                      width={120}
                    />
                    <Tooltip content={<SampleTooltip />} />
                    <Bar dataKey="value" radius={[0, 5, 5, 0]} maxBarSize={40}>
                      {SAMPLE_CHART_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-400 mt-4 text-center">Sample — 7% investment return, 4% salary growth, Toronto living costs</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ CTA STRIP ════════════ */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 110%, rgba(34,197,94,0.08) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-4">Get Started</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            Ready to run your numbers?
          </h2>
          <p className="text-slate-400 text-base mb-9 max-w-sm mx-auto">
            Pick your university and program. See your ROI in seconds. Free, forever.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/calculator"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-600 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors uppercase tracking-wide shadow-brand"
            >
              Calculate My ROI →
            </Link>
            <Link
              to="/compare"
              className="inline-flex items-center text-white border border-white/20 hover:border-white/40 hover:bg-white/5 font-semibold px-8 py-3.5 rounded-xl text-sm transition-colors"
            >
              Compare Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
