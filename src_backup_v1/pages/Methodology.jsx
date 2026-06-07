function Section({ title, children }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-navy mb-4 pb-3 border-b border-slate-100">{title}</h2>
      {children}
    </div>
  );
}

function Source({ name, url, description }) {
  return (
    <div className="flex gap-4 py-4 border-b border-slate-50 last:border-0">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center mt-0.5">
        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </div>
      <div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-navy hover:text-brand transition-colors"
        >
          {name}
        </a>
        <p className="text-sm text-slate-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function Formula({ name, formula, explanation }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-6 mb-4">
      <h4 className="text-sm font-bold text-navy mb-2">{name}</h4>
      <code className="block bg-navy text-green-300 rounded-xl px-4 py-3 text-sm font-mono mb-3 overflow-x-auto">{formula}</code>
      <p className="text-sm text-slate-500 leading-relaxed">{explanation}</p>
    </div>
  );
}

export default function Methodology() {
  return (
    <div className="flex-1 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold text-brand uppercase tracking-widest">How It Works</span>
          <h1 className="text-4xl font-extrabold text-navy tracking-tight mt-2 mb-4">Data Methodology</h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Every number in CampusROI comes from a real, citable source. Here's exactly where the data comes from and how we calculate your results.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-4 py-2 rounded-full">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last updated: January 2025. Data reviewed every 6 months.
          </div>
        </div>

        {/* Tuition */}
        <Section title="Tuition Data">
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Annual tuition figures are sourced directly from each university's official registrar and student accounts websites. We use the most recent academic year (2024–25) domestic student tuition rates for each specific program. Tuition is confirmed by cross-referencing with Statistics Canada's Tuition and Living Accommodation Costs survey.
          </p>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <Source
              name="University of Waterloo — Student Accounts"
              url="https://uwaterloo.ca/student-accounts/tuition-fee-schedules"
              description="Official tuition schedules for all Waterloo programs including Math, Engineering, and Arts."
            />
            <Source
              name="University of Toronto — Student Accounts"
              url="https://studentaccount.utoronto.ca/tuition-fees/"
              description="Per-program tuition rates for Arts & Science, Engineering, and Rotman Commerce."
            />
            <Source
              name="McGill University — Tuition and Fees"
              url="https://www.mcgill.ca/student-accounts/tuition-fees"
              description="Quebec domestic tuition rates (significantly lower due to provincial subsidy)."
            />
            <Source
              name="Statistics Canada — Tuition and Living Accommodation Costs"
              url="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3710001101"
              description="National benchmark for validating per-program tuition data."
            />
          </div>
        </Section>

        {/* Co-op salaries */}
        <Section title="Co-op Salary Data">
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Co-op salary averages are primarily sourced from the University of Waterloo's annual co-op employment reports, which publish average salaries by discipline. For other universities, we use Glassdoor, LinkedIn Salary Insights, and WayUp/Handshake employer postings filtered to Canadian co-op positions. Figures represent gross pay per 4-month term before taxes.
          </p>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <Source
              name="University of Waterloo Co-op Employment Report"
              url="https://uwaterloo.ca/co-operative-education/find-out-more-about-co-op/co-op-earnings-report"
              description="Annual report of co-op student earnings by faculty — the most comprehensive published source in Canada."
            />
            <Source
              name="Glassdoor Canada — Co-op Salaries"
              url="https://www.glassdoor.ca/Salaries/canada-co-op-salary-SRCH_IL.0,6_IN3_KO7,12.htm"
              description="Crowdsourced co-op salary data used to supplement Waterloo's published figures."
            />
            <Source
              name="LinkedIn Salary Insights"
              url="https://www.linkedin.com/salary/"
              description="Used to validate entry-level and co-op salary ranges by discipline and region."
            />
          </div>
        </Section>

        {/* Starting salaries */}
        <Section title="Starting Salary Data">
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Starting salaries represent the median first-year compensation for graduates entering their field, sourced from the Statistics Canada Labour Force Survey, LinkedIn Salary Insights, the Ontario University Application Centre's outcomes data, and industry-specific salary surveys (e.g., Engineering Canada, CPA Canada). We report the 50th percentile figure.
          </p>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <Source
              name="Statistics Canada Labour Force Survey"
              url="https://www23.statcan.gc.ca/imdb/p2SV.pl?Function=getSurvey&SDDS=3701"
              description="Primary source for Canadian wages by occupation (NOC codes) and education level."
            />
            <Source
              name="OUAC Graduate Outcomes Survey"
              url="https://www.ouac.on.ca/"
              description="Ontario-specific graduate employment and salary data by university and field of study."
            />
            <Source
              name="Engineering Canada — Salary Survey"
              url="https://engineerscanada.ca/"
              description="Engineering-specific compensation benchmarks used for all engineering program data."
            />
          </div>
        </Section>

        {/* Cost of living */}
        <Section title="Cost of Living Data">
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Monthly cost of living estimates (rent + living expenses) for each city are sourced from Numbeo's Canadian city data, the CMHC Rental Market Report, and Statistics Canada's Consumer Price Index. Annual totals reflect a single-person budget including rent, groceries, transit, and miscellaneous expenses.
          </p>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <Source
              name="Numbeo — Cost of Living in Canada"
              url="https://www.numbeo.com/cost-of-living/country_result.jsp?country=Canada"
              description="City-by-city breakdown of rent, groceries, and consumer goods."
            />
            <Source
              name="CMHC Rental Market Report"
              url="https://www.cmhc-schl.gc.ca/housing-observer-online/rental-market-report"
              description="Canada's authoritative source for average rental prices by city and bedroom count."
            />
          </div>
        </Section>

        {/* Financial model */}
        <Section title="Financial Model & Formulas">
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            All projections are calculated in real (inflation-adjusted) Canadian dollars. The model runs 10 years post-graduation, comparing two scenarios: completing the selected degree vs. entering the workforce immediately at an entry-level wage.
          </p>

          <Formula
            name="Net Degree Cost"
            formula="Net Cost = (Annual Tuition × Years) − (Co-op Terms × Avg Term Salary × 0.72) − (Avg Bursary × Years)"
            explanation="The 0.72 multiplier accounts for an approximate 28% effective tax rate on co-op income (CPP, EI, federal + provincial income tax for a typical co-op salary range). The average annual bursary of $2,500 is based on Statistics Canada's survey of university financial aid."
          />

          <Formula
            name="Net Worth — With Degree"
            formula="NW[yr] = NW[yr−1] × (1 + investmentReturn) + max((salary − costOfLiving − annualLoanPayment) × 0.20, 0)"
            explanation="Starting at year 0 (graduation), 20% of disposable income after living costs and loan repayment is invested annually. Net worth compounds at the selected investment return rate (default 7%, representing the historical real return of a diversified equity portfolio)."
          />

          <Formula
            name="Net Worth — Without Degree"
            formula="NW[yr] = NW[yr−1] × (1 + investmentReturn) + max((income − costOfLiving + tuitionSaved) × 0.30, 0)"
            explanation="The no-degree baseline starts at $42,000/year (median Canadian entry-level wage without post-secondary). During years the degree student would be in school, the no-degree worker also invests the tuition savings. A higher 30% savings rate is applied during university years (lower living expenses without student life)."
          />

          <Formula
            name="Loan Repayment (Standard Amortization)"
            formula="Monthly Payment = P × [r(1+r)^n] / [(1+r)^n − 1]"
            explanation="Where P = principal (tuition × loan percentage), r = monthly interest rate (annual rate ÷ 12), n = repayment months (10 years × 12 = 120). This is the standard Canadian student loan amortization formula used by OSAP and NSLSC."
          />

          <Formula
            name="Break-even Year"
            formula="Break-even = first year where NW_withDegree[yr] ≥ NW_withoutDegree[yr]"
            explanation="The break-even point is the first year post-graduation where the degree holder's cumulative net worth catches up to and exceeds the no-degree baseline. If this never happens within 10 years, it is reported as 'greater than 10 years.'"
          />
        </Section>

        {/* Assumptions */}
        <Section title="Key Assumptions & Limitations">
          <div className="space-y-4 text-sm text-slate-500 leading-relaxed">
            <div className="flex gap-3">
              <span className="text-brand font-bold mt-0.5">→</span>
              <p><span className="font-semibold text-slate-700">Investment returns:</span> Default 7% represents the historical average annual real return of the S&P/TSX Composite Index over 20-year periods (Bank of Canada data). This assumes consistent market participation — actual returns will vary.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-brand font-bold mt-0.5">→</span>
              <p><span className="font-semibold text-slate-700">Salary growth:</span> Default 4% per year is based on the Bank of Canada's wage growth projections and Statistics Canada's average annual compensation increase data (2015–2024).</p>
            </div>
            <div className="flex gap-3">
              <span className="text-brand font-bold mt-0.5">→</span>
              <p><span className="font-semibold text-slate-700">Individual variation:</span> All figures represent median outcomes. Actual salaries, tuition, and investment returns vary significantly by individual circumstances, employer, economic conditions, and career choices.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-brand font-bold mt-0.5">→</span>
              <p><span className="font-semibold text-slate-700">Non-financial value:</span> This tool models financial return only. Education has significant non-financial value (career satisfaction, social networks, credentialing) that is not captured here.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-brand font-bold mt-0.5">→</span>
              <p><span className="font-semibold text-slate-700">Taxes:</span> The model does not apply full marginal income tax rates to net worth projections. It applies simplified savings rates (20% of disposable income) which implicitly account for taxes.</p>
            </div>
          </div>
        </Section>

        {/* Update cadence */}
        <div className="bg-slate-50 rounded-2xl p-6 text-sm text-slate-500">
          <p className="font-semibold text-navy mb-1.5">Data Review Cadence</p>
          <p className="leading-relaxed">
            All data in CampusROI is reviewed and updated every 6 months — in January and July — to reflect the most recent academic year tuition schedules, published salary surveys, and Statistics Canada releases. The current dataset reflects 2024–25 tuition rates and 2023–24 salary data.
          </p>
        </div>
      </div>
    </div>
  );
}
