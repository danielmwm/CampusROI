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
  'University of Waterloo', 'University of Toronto', 'McGill University',
  "Queen's University", 'UBC', 'Western University',
  'McMaster University', 'Toronto Metropolitan', 'York University', 'Carleton University',
  'University of Ottawa', 'University of Guelph', 'Wilfrid Laurier University', 'Ontario Tech University',
  'Brock University', 'University of Windsor', 'Simon Fraser University', 'University of Victoria',
  'University of Alberta', 'University of Calgary', 'University of Manitoba', 'University of Saskatchewan',
  'Dalhousie University', 'University of New Brunswick', 'Memorial University',
  'Concordia University', 'Université Laval',
];

const STEPS = [
  {
    n: '01',
    title: 'Pick your program',
    desc: 'Choose from 25 Canadian universities and 130+ programs — CS, Engineering, Commerce, Health Sciences, and more.',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
  },
  {
    n: '02',
    title: 'Set your scenario',
    desc: 'Tune co-op terms, scholarship amounts, target city, loan rate, and investment return. Every assumption is editable.',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
  },
  {
    n: '03',
    title: 'See your ROI',
    desc: 'Instantly see net degree cost, break-even year, starting salary, and 10-year net worth — all updating as you type.',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  },
];

const FEATURES = [
  {
    title: 'True cost of attendance',
    desc: 'Tuition, residence, meal plan, and co-op earnings all factored in. No hidden assumptions — every number is yours to edit.',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>,
    wide: true,
  },
  {
    title: '10-year net worth projection',
    desc: 'Compare your degree path vs. entering the workforce immediately — with adjustable salary growth and investment returns.',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
    wide: false,
    tall: true,
  },
  {
    title: 'Side-by-side comparison',
    desc: 'Load up to 3 programs on the same chart. See how CS stacks up against Engineering or Commerce on every metric.',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>,
    wide: true,
  },
];

/* ─── Gradient text helper ────────────────────────────── */
const gradientStyle = {
  background: 'linear-gradient(135deg, #22C55E 0%, #86EFAC 60%, #4ADE80 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

/* ─── Sub-components ──────────────────────────────────── */

const SampleTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700">{payload[0].payload.name}</p>
      <p className="text-gray-600 mt-0.5">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

function HeroSparkline() {
  return (
    <div className="border-t border-white/5 pt-4">
      <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mb-3">Net worth projection</p>
      <svg viewBox="0 0 280 64" className="w-full h-14" preserveAspectRatio="none">
        <defs>
          <linearGradient id="degreeGrad2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 62 C40 60 80 52 120 38 C160 24 200 10 280 3 L280 64 L0 64 Z" fill="url(#degreeGrad2)" />
        <path d="M0 54 C70 50 140 45 210 38 C245 35 262 33 280 30" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="5 3" />
        <path d="M0 62 C40 60 80 52 120 38 C160 24 200 10 280 3" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <div className="flex gap-5 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-brand rounded-full inline-block" />
          <span className="text-xs text-slate-500">With degree</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-px inline-block" style={{ background: 'repeating-linear-gradient(90deg,#334155 0,#334155 4px,transparent 4px,transparent 8px)' }} />
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

      {/* ════ HERO ════ */}
      <section className="relative bg-[#080E1A] overflow-hidden">
        {/* Aurora glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '60%', height: '70%', background: 'radial-gradient(ellipse, rgba(34,197,94,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', top: '30%', right: '-10%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-14 xl:gap-20 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand bg-brand/10 border border-brand/20 px-3.5 py-1.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                Free · Built for Canadians · No account needed
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[68px] font-black tracking-tight leading-[1.06] text-white mb-6">
                Your degree is<br className="hidden sm:block" /> an investment.{' '}
                <span style={gradientStyle}>Know the return.</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-9 max-w-lg">
                CampusROI calculates the real financial return of any Canadian university program — tuition, co-op earnings, salary, and 10-year net worth — so you choose with data, not gut feeling.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  to="/calculator"
                  className="group inline-flex items-center gap-2 bg-brand text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 uppercase tracking-wide hover:bg-brand-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/30"
                >
                  Calculate My ROI
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  to="/compare"
                  className="inline-flex items-center gap-2 text-white border border-white/15 hover:border-white/35 hover:bg-white/5 font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200"
                >
                  Compare Programs
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
                {['25 universities', '130+ programs', '2024–25 data', 'All assumptions editable'].map((item, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-slate-600 rounded-full" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: preview card */}
            <div className="relative">
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-2xl shadow-black/30">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/[0.06]">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sample scenario</p>
                    <p className="text-sm font-bold text-white mt-0.5">Waterloo CS · Co-op</p>
                  </div>
                  <span className="text-[11px] bg-brand/15 text-brand border border-brand/20 px-2.5 py-1 rounded-full font-bold">2025 → 2030</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {[
                    { label: 'Net degree cost', value: '$28,400', sub: 'after co-op & aid', accent: false },
                    { label: 'Starting salary', value: '$95,000', sub: 'yr 1 post-grad', accent: false },
                    { label: 'Break-even', value: 'Year 3', sub: 'post-graduation', accent: true },
                    { label: '10-yr net worth', value: '$892K', sub: 'projected', accent: true },
                  ].map((m, i) => (
                    <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 hover:bg-white/[0.07] transition-colors">
                      <p className="text-[10px] text-slate-500 font-medium mb-1">{m.label}</p>
                      <p className={`text-[18px] font-extrabold leading-tight ${m.accent ? 'text-brand' : 'text-white'}`}>{m.value}</p>
                      <p className="text-[10px] text-slate-600 mt-0.5">{m.sub}</p>
                    </div>
                  ))}
                </div>

                <HeroSparkline />
              </div>
              <div className="absolute -top-3 -right-2 bg-brand text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-brand/40 uppercase tracking-wider">
                Real-time
              </div>
            </div>
          </div>
        </div>

        {/* Dark-to-dark stats strip fused to hero */}
        <div className="relative border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
              {[
                { number: '25', label: 'Canadian universities' },
                { number: '130+', label: 'Programs covered' },
                { number: '100%', label: 'Free — always' },
                { number: '2025', label: 'Data up to date' },
              ].map((stat, i) => (
                <div key={i} className="py-7 px-6 text-center">
                  <p className="text-2xl font-extrabold text-white tracking-tight">{stat.number}</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ HOW IT WORKS ════ */}
      <section className="bg-[#F9FAFB] py-24 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-4xl font-black text-navy tracking-tight leading-tight">From zero to ROI in 60 seconds</h2>
            <p className="text-slate-500 mt-3 text-base leading-relaxed">No spreadsheets. No guesswork. Pick a program, tweak your scenario, see your 10-year picture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-200 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100 transition-all duration-200 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-navy text-brand flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-gray-100 tabular-nums">{step.n}</span>
                </div>
                <h3 className="text-base font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FEATURES (bento) ════ */}
      <section className="bg-white py-24 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">What You Get</p>
            <h2 className="text-4xl font-black text-navy tracking-tight leading-tight">Everything to decide with confidence</h2>
          </div>

          {/* Bento grid: wide | tall on right; wide below */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(180px,auto)]">

            {/* Feature 1 — wide */}
            <div className="md:col-span-2 bg-[#F9FAFB] border border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
              <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 text-slate-400 group-hover:bg-navy group-hover:text-brand group-hover:border-navy flex items-center justify-center mb-5 transition-all duration-200 shadow-sm">
                {FEATURES[0].icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy mb-2">{FEATURES[0].title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{FEATURES[0].desc}</p>
              </div>
            </div>

            {/* Feature 2 — tall (right column, spans 2 rows) */}
            <div className="md:row-span-2 bg-navy rounded-2xl p-8 hover:shadow-xl hover:shadow-navy/20 transition-all duration-200 group flex flex-col justify-between">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 text-brand flex items-center justify-center mb-5 group-hover:bg-brand group-hover:text-white transition-all duration-200">
                {FEATURES[1].icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{FEATURES[1].title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{FEATURES[1].desc}</p>
              </div>
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-end gap-1 h-10">
                  {[30, 50, 42, 70, 60, 85, 78].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-brand/30 hover:bg-brand/60 transition-colors" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">10-year net worth growth</p>
              </div>
            </div>

            {/* Feature 3 — wide */}
            <div className="md:col-span-2 bg-[#F9FAFB] border border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
              <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 text-slate-400 group-hover:bg-navy group-hover:text-brand group-hover:border-navy flex items-center justify-center mb-5 transition-all duration-200 shadow-sm">
                {FEATURES[2].icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy mb-2">{FEATURES[2].title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{FEATURES[2].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ UNIVERSITIES ════ */}
      <section className="bg-[#080E1A] py-20 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">Coverage</p>
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">25 universities. 130+ programs.</h2>
          <p className="text-sm text-slate-500 mb-10">Every major Canadian province covered, with programs across every faculty.</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {UNIVERSITIES.map((uni, i) => (
              <span
                key={i}
                className="text-xs font-semibold text-slate-400 bg-white/[0.04] border border-white/10 px-4 py-2 rounded-full hover:border-brand/40 hover:text-brand transition-all duration-150 cursor-default"
              >
                {uni}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-7">More schools added regularly · Updated Jan & Jul each year</p>
        </div>
      </section>

      {/* ════ SAMPLE CHART ════ */}
      <section className="bg-[#F9FAFB] py-24 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
              <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">Sample Data</p>
              <h2 className="text-4xl font-black text-navy tracking-tight leading-tight mb-4">The spread is bigger than you think</h2>
              <p className="text-base text-slate-500 leading-relaxed mb-8">
                A Waterloo CS grad's projected 10-year net worth is nearly{' '}
                <strong className="text-navy font-semibold">3× that of someone who skipped university</strong>{' '}
                — but the gap between programs is just as wide. That's exactly what CampusROI quantifies.
              </p>
              <div className="space-y-3.5 mb-8">
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
                className="group inline-flex items-center gap-2 text-xs font-bold text-brand hover:text-brand-600 uppercase tracking-widest transition-colors"
              >
                Calculate yours
                <svg className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-xs text-slate-400 font-semibold mb-5 uppercase tracking-wide">Projected 10-Year Net Worth (CAD)</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SAMPLE_CHART_DATA} layout="vertical" margin={{ left: 4, right: 12, top: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                    <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} tickFormatter={formatCurrencyShort} />
                    <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 500 }} width={120} />
                    <Tooltip content={<SampleTooltip />} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={40}>
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

      {/* ════ CTA ════ */}
      <section className="bg-[#080E1A] py-28 relative overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(34,197,94,0.1) 0%, transparent 60%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-5">Get Started</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Ready to run your numbers?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-sm mx-auto leading-relaxed">
            Pick your university and program. See your ROI in seconds. Free, forever.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/calculator"
              className="group inline-flex items-center gap-2 bg-brand hover:bg-brand-600 text-white font-bold px-9 py-4 rounded-xl text-sm transition-all duration-200 uppercase tracking-wide hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
            >
              Calculate My ROI
              <svg className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/compare"
              className="inline-flex items-center text-white border border-white/15 hover:border-white/35 hover:bg-white/5 font-semibold px-9 py-4 rounded-xl text-sm transition-all duration-200"
            >
              Compare Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
