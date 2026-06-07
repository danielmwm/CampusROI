import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { formatCurrencyShort } from '../utils/formatting';

/* ─── Data ───────────────────────────────────────────── */

const CHART_DATA = [
  { name: 'Waterloo CS', value: 892000 },
  { name: 'UofT Engineering', value: 748000 },
  { name: 'McGill CS', value: 612000 },
  { name: 'Dal Engineering', value: 458000 },
  { name: 'No Degree', value: 310000 },
];

const UNIVERSITIES = [
  'University of Waterloo', 'University of Toronto', 'McGill University',
  "Queen's University", 'UBC', 'Western University', 'McMaster University',
  'Toronto Metropolitan', 'York University', 'Carleton University',
  'University of Ottawa', 'University of Guelph', 'Wilfrid Laurier University',
  'Ontario Tech University', 'Brock University', 'University of Windsor',
  'Simon Fraser University', 'University of Victoria', 'University of Alberta',
  'University of Calgary', 'University of Manitoba', 'University of Saskatchewan',
  'Dalhousie University', 'University of New Brunswick', 'Memorial University',
  'Concordia University', 'Université Laval',
];

/* ─── Hero background lines ──────────────────────────── */

const HeroLines = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    preserveAspectRatio="none"
    viewBox="0 0 1440 900"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M-200,900 C0,860 150,800 320,720 C490,635 590,520 730,400 C870,280 980,180 1160,100 C1280,48 1380,20 1640,0"
      stroke="white" strokeWidth="1.5" opacity="0.1"
    />
    <path
      d="M-200,960 C50,910 210,850 410,760 C610,670 710,560 860,430 C1010,300 1100,200 1270,120 C1370,72 1450,44 1640,20"
      stroke="white" strokeWidth="1" opacity="0.05"
    />
  </svg>
);

/* ─── Dark chart tooltip ─────────────────────────────── */

const DarkTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3">
      <p className="text-white/60 text-xs mb-0.5">{label}</p>
      <p className="text-white font-medium text-sm">{formatCurrencyShort(payload[0].value)}</p>
    </div>
  );
};

/* ─── Home ───────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="flex-1">

      {/* ══ HERO ════════════════════════════════════════ */}
      <section className="relative -mt-16 h-screen bg-black overflow-hidden flex flex-col items-center justify-end pb-28 md:pb-36">
        <HeroLines />

        {/* Subtle green glow at center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-[11px] font-medium text-white/40 uppercase tracking-[0.3em] mb-8">
            ROI Calculator for Canadian Degrees
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-light text-white tracking-tight leading-[1.02] mb-6">
            Know Your<br />Return.
          </h1>
          <p className="text-lg md:text-xl font-light text-white/55 max-w-md mx-auto mb-3">
            25 universities. 130+ programs. See which degree actually pays off — in real dollars.
          </p>
          <p className="text-sm font-light text-white/30 mb-12">
            Waterloo · UofT · McGill · UBC · Queen's · Western · and 20 more
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/calculator"
              className="px-10 py-3.5 bg-white text-black text-sm font-medium rounded-full min-w-[200px] hover:bg-white/90 transition-colors"
            >
              Calculate My ROI
            </Link>
            <Link
              to="/compare"
              className="px-10 py-3.5 bg-white/10 text-white text-sm font-medium rounded-full min-w-[200px] border border-white/25 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              Compare Programs
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════ */}
      <section className="bg-white py-24 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: '$892K', label: 'Top 10-yr\nnet worth' },
              { number: '5.2 yrs', label: 'Average\nbreak-even' },
              { number: '130+', label: 'Programs\ncovered' },
              { number: '25', label: 'Canadian\nuniversities' },
            ].map(({ number, label }) => (
              <div key={number}>
                <p className="text-4xl md:text-5xl font-light text-black tracking-tight">{number}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 mt-2.5 leading-relaxed whitespace-pre-line">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURE A — Chart ═══════════════════════════ */}
      <section className="bg-black py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">

            {/* Text */}
            <div>
              <p className="text-[11px] font-medium text-white/35 uppercase tracking-[0.25em] mb-7">Side by side</p>
              <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight mb-6">
                Not all degrees<br />pay off equally.
              </h2>
              <p className="text-base font-light text-white/55 leading-relaxed max-w-xs mb-10">
                The gap between the highest and lowest ROI programs can exceed $500,000 over ten years. The right choice matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/calculator"
                  className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors text-center"
                >
                  Run the Numbers
                </Link>
                <Link
                  to="/compare"
                  className="px-8 py-3 bg-white/10 text-white text-sm font-medium rounded-full border border-white/20 hover:bg-white/20 transition-colors text-center"
                >
                  Compare Now
                </Link>
              </div>
            </div>

            {/* Bar chart */}
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={CHART_DATA} barSize={36} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<DarkTooltip />} cursor={false} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {CHART_DATA.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={
                          i === 0
                            ? '#22C55E'
                            : i === CHART_DATA.length - 1
                            ? 'rgba(255,255,255,0.12)'
                            : `rgba(255,255,255,${0.22 - i * 0.04})`
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-[11px] text-white/25 mt-4 text-right tracking-wide">
                10-year projected net worth · 2024–25 data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURE B — How it works ════════════════════ */}
      <section className="bg-[#f4f4f4] py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">

            {/* Steps */}
            <div className="space-y-14">
              {[
                {
                  n: '01',
                  title: 'Pick your program',
                  body: 'Choose from 25 universities and 130+ programs across all 9 Canadian provinces.',
                },
                {
                  n: '02',
                  title: 'Set your assumptions',
                  body: 'Adjust co-op terms, loan percentage, post-grad city, residence, and investment return.',
                },
                {
                  n: '03',
                  title: 'See your return',
                  body: 'Get a 10-year net worth projection and exact break-even year, instantly.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-8 items-start">
                  <p className="text-5xl font-light text-neutral-200 tabular-nums shrink-0 leading-none">{n}</p>
                  <div className="pt-1">
                    <h3 className="text-xl font-medium text-black mb-2">{title}</h3>
                    <p className="text-sm font-light text-neutral-500 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Text side */}
            <div>
              <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-[0.25em] mb-7">Three steps</p>
              <h2 className="text-4xl md:text-5xl font-light text-black tracking-tight leading-tight mb-6">
                Simple inputs.<br />Real projections.
              </h2>
              <p className="text-base font-light text-neutral-500 leading-relaxed max-w-xs mb-10">
                No sign-up. No paywall. Just honest math applied to real tuition, salary, and cost-of-living data from 25 Canadian universities.
              </p>
              <Link
                to="/calculator"
                className="inline-block px-8 py-3 bg-[#3d3d3d] text-white text-sm font-medium rounded-full hover:bg-black transition-colors"
              >
                Try It Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ UNIVERSITIES ════════════════════════════════ */}
      <section className="bg-[#171717] py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[11px] font-medium text-white/35 uppercase tracking-[0.25em] mb-5">Coverage</p>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
            25 universities.<br className="sm:hidden" /> 9 provinces.
          </h2>
          <p className="text-sm font-light text-white/45 mb-14">Every major school. Every major program.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {UNIVERSITIES.map((uni) => (
              <span
                key={uni}
                className="text-xs font-medium text-white/45 bg-white/[0.04] border border-white/[0.08] px-4 py-2 rounded-full hover:border-white/20 hover:text-white/65 transition-all duration-200 cursor-default"
              >
                {uni}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════ */}
      <section className="bg-white py-44">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-[0.3em] mb-7">
            Free · No account required
          </p>
          <h2 className="text-5xl md:text-6xl font-light text-black tracking-tight leading-[1.05] mb-6">
            Your degree.<br />Your numbers.
          </h2>
          <p className="text-lg font-light text-neutral-400 mb-14 max-w-sm mx-auto">
            Run a full 10-year ROI projection in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/calculator"
              className="px-10 py-4 bg-black text-white text-sm font-medium rounded-full min-w-[220px] hover:bg-neutral-800 transition-colors"
            >
              Calculate Now
            </Link>
            <Link
              to="/compare"
              className="px-10 py-4 bg-black/5 text-black text-sm font-medium rounded-full min-w-[220px] border border-black/[0.12] hover:bg-black/10 transition-colors"
            >
              Compare Programs
            </Link>
          </div>
          <p className="text-xs text-neutral-300 mt-16 tracking-wide">
            2024–25 data · Updated twice annually · Estimates only
          </p>
        </div>
      </section>

    </div>
  );
}
