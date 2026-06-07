function Section({ title, children }) {
  return (
    <div className="mb-14">
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

function UniGroup({ province, schools }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">{province}</p>
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        {schools.map((s) => (
          <Source key={s.name} name={s.name} url={s.url} description={s.description} />
        ))}
      </div>
    </div>
  );
}

const TUITION_SOURCES = [
  {
    province: 'Ontario',
    schools: [
      { name: 'University of Waterloo — Student Accounts', url: 'https://uwaterloo.ca/student-accounts/tuition-fee-schedules', description: 'Per-program tuition schedules for Math, Engineering, Arts, and Environment faculties. Co-op surcharges confirmed via engineering supplemental fees schedule.' },
      { name: 'University of Toronto — Student Accounts', url: 'https://studentaccount.utoronto.ca/tuition-fees/', description: 'Per-program deregulated tuition rates for Arts & Science, Engineering, Rotman Commerce, and Lawrence Bloomberg Nursing.' },
      { name: "Queen's University — Registrar", url: 'https://www.queensu.ca/registrar/tuition-fees', description: 'Tuition for Engineering & Applied Science, Smith School of Business (BCom), and Arts & Science programs including Kinesiology.' },
      { name: 'Western University — Registrar', url: 'https://registrar.uwo.ca/student_finances/fees_sessional/index.html', description: 'Per-program sessional fees for Science, Engineering, Ivey HBA, Health Sciences, and Social Science.' },
      { name: 'McMaster University — Registrar', url: 'https://registrar.mcmaster.ca/tuition-fees/', description: 'Engineering, Health Sciences, DeGroote Business, and Life Sciences tuition rates for domestic students.' },
      { name: 'Toronto Metropolitan University — Student Accounts', url: 'https://www.torontomu.ca/studentaccounts/', description: 'Per-program fees for Computer Science, Engineering & Architectural Science, Ted Rogers School of Management, and Community Services.' },
      { name: 'York University — Student Financial Services', url: 'https://sfs.yorku.ca/fees/', description: 'Lassonde (CS & Engineering), Schulich Business, Health, and Liberal Arts & Professional Studies program fees.' },
      { name: 'Carleton University — Student Accounts', url: 'https://carleton.ca/studentaccounts/tuition-fees/', description: 'Engineering & Design, Sprott Business, Public Affairs, and Science program tuition schedules.' },
      { name: 'University of Ottawa — Student Accounts', url: 'https://www.uottawa.ca/university-fees/', description: 'Bilingual university fees for Engineering, Science, Telfer Management, and Health Sciences; co-op fee differentials confirmed separately.' },
      { name: 'University of Guelph — Registrar', url: 'https://www.uoguelph.ca/registrar/studentfinance/fees/', description: 'Computing & Information Science, Engineering, Lang School of Business, Ontario Veterinary College, and Ontario Agricultural College fees.' },
      { name: 'Wilfrid Laurier University — Student Finances', url: 'https://students.wlu.ca/money-and-finances/tuition-and-fees/', description: 'Lazaridis Business (BBA), Science (CS & Financial Mathematics), and Arts tuition; co-op program levies confirmed via Laurier co-op office.' },
      { name: 'Ontario Tech University — Student Accounts', url: 'https://ontariotechu.ca/services/student-accounts/', description: 'Engineering & Applied Science, Science, Business & IT, and Health Sciences program fees.' },
      { name: 'Brock University — Student Financial Services', url: 'https://brocku.ca/sfs/tuition/', description: 'Goodman Business, Applied Health Sciences (Kinesiology & Nursing), and Mathematics & Science program fees.' },
      { name: 'University of Windsor — Registrar', url: 'https://www.uwindsor.ca/registrar/462/tuition-and-fees', description: 'Engineering, Science, Odette Business, Nursing, and Social Work tuition schedules.' },
    ],
  },
  {
    province: 'British Columbia',
    schools: [
      { name: 'University of British Columbia — Student Services', url: 'https://students.ubc.ca/enrolment/finances/tuition-fees', description: 'Applied Science (Engineering), Science, Sauder Commerce, and Nursing tuition. Arts and Science deregulated rates confirmed via Faculty of Science schedule.' },
      { name: 'Simon Fraser University — Student Accounts', url: 'https://www.sfu.ca/students/financialaid/payments/tuition.html', description: 'Computing Science, Applied Science Engineering, Beedie Business, and Faculty of Science fees; co-op administrative fees confirmed via SFU co-op office.' },
      { name: 'University of Victoria — Registrar', url: 'https://www.uvic.ca/registrar/students/costs/tuition/', description: 'Engineering & Computer Science (CS & Computer Eng), Gustavson Commerce, Human & Social Development (Nursing), and Science program fees.' },
    ],
  },
  {
    province: 'Alberta',
    schools: [
      { name: 'University of Alberta — Registrar', url: 'https://www.ualberta.ca/registrar/registration-and-courses/tuition-and-fees/', description: 'Science, Engineering (including Petroleum Eng), Alberta School of Business, and Nursing tuition. Alberta provincial tuition freeze context confirmed via CAUS data.' },
      { name: 'University of Calgary — Registrar', url: 'https://www.ucalgary.ca/registrar/finances/tuition-fees', description: 'Science, Schulich Engineering, Haskayne Business, Nursing, and Kinesiology program fees.' },
    ],
  },
  {
    province: 'Manitoba',
    schools: [
      { name: 'University of Manitoba — Registrar', url: 'https://umanitoba.ca/registrar/tuition-fees', description: 'Science, Engineering, Asper Business, Nursing, and Agricultural & Food Sciences fees. Manitoba tuition regulation context confirmed via Manitoba Student Aid data.' },
    ],
  },
  {
    province: 'Saskatchewan',
    schools: [
      { name: 'University of Saskatchewan — Student Finances', url: 'https://students.usask.ca/money/tuition/index.php', description: 'Science, Engineering, Edwards Business, Nursing, and Agriculture & Bioresources tuition schedules.' },
    ],
  },
  {
    province: 'Nova Scotia',
    schools: [
      { name: 'Dalhousie University — Student Accounts', url: 'https://www.dal.ca/campus_life/student-accounts/tuition-fees.html', description: 'Computer Science, Engineering, Rowe Business, Health (Nursing & Health Sciences), and Science program tuition.' },
    ],
  },
  {
    province: 'New Brunswick',
    schools: [
      { name: 'University of New Brunswick — Registrar', url: 'https://www.unb.ca/registrar/current-students/tuition-fees.html', description: 'Computer Science, Engineering (including Software Eng), Faculty of Business, Nursing, and Science program fees.' },
    ],
  },
  {
    province: 'Newfoundland and Labrador',
    schools: [
      { name: 'Memorial University — Registrar', url: 'https://www.mun.ca/regoff/fees/', description: "Canada's lowest university tuition — Science, Engineering & Applied Science (including Ocean & Naval Architectural Eng), Business, and Nursing fees." },
    ],
  },
  {
    province: 'Quebec',
    schools: [
      { name: 'McGill University — Student Accounts', url: 'https://www.mcgill.ca/student-accounts/tuition-fees', description: 'Science, Engineering, Desautels Commerce, Ingram Nursing, and Arts tuition. Quebec domestic rates confirmed (significantly lower due to provincial subsidy structure).' },
      { name: 'Concordia University — Student Accounts', url: 'https://www.concordia.ca/enrolment/student-accounts/tuition-fees.html', description: 'Engineering & Computer Science, John Molson Business, Fine Arts, and Arts & Science program fees.' },
      { name: 'Université Laval — Droits de scolarité', url: 'https://www.ulaval.ca/en/studies/tuition-fees', description: 'Sciences & Génie, FSA Business, and Nursing (Sciences Infirmières) tuition. Quebec QAC tuition regulation confirmed via Bureau de la registraire.' },
      { name: 'Statistics Canada — Tuition and Living Accommodation Costs (Table 37-10-0011-01)', url: 'https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3710001101', description: 'National benchmark used to cross-validate all per-program tuition figures across all 25 universities.' },
    ],
  },
];

const COOP_SOURCES = [
  { name: 'University of Waterloo Co-op Earnings Report', url: 'https://uwaterloo.ca/co-operative-education/find-out-more-about-co-op/co-op-earnings-report', description: 'Annual published report of co-op term earnings by faculty (Math, Engineering, Arts). Primary benchmark for CS, SE, and Engineering co-op salaries across all Canadian universities.' },
  { name: 'University of Ottawa — Co-op & Career Action', url: 'https://www.uottawa.ca/career-experiential-learning/', description: 'Ottawa-specific co-op placement rates and average salary ranges by program, used for Ottawa Engineering and Science co-op figures.' },
  { name: 'SFU Co-operative Education — Employer & Student Reports', url: 'https://www.sfu.ca/coop.html', description: 'SFU co-op salary averages by Computing Science, Applied Science, and Beedie Business disciplines.' },
  { name: 'UBC Co-op Programs — Annual Report', url: 'https://you.ubc.ca/applying-ubc/student-life/co-op-work-learn/', description: 'Co-op term compensation data for Applied Science and Science programs at UBC.' },
  { name: 'Glassdoor Canada — Co-op / Intern Salaries', url: 'https://www.glassdoor.ca/Salaries/canada-co-op-salary-SRCH_IL.0,6_IN3_KO7,12.htm', description: 'Crowdsourced co-op salary data by role and city, used to calibrate figures for schools without published co-op earnings reports.' },
  { name: 'LinkedIn Salary Insights — Canada', url: 'https://www.linkedin.com/salary/', description: 'Entry-level and internship compensation data by discipline and metro region, used to validate all co-op salary ranges.' },
  { name: 'Glassdoor Canada — Software Engineer Internship', url: 'https://www.glassdoor.ca/Salaries/canada-software-engineer-intern-salary-SRCH_IL.0,6_IN3_KO7,31.htm', description: 'Used specifically to calibrate software engineering co-op figures at SFU, Concordia, UNB, and Dal.' },
];

const SALARY_SOURCES = [
  { name: 'Statistics Canada Labour Force Survey — Wages by Education (Table 14-10-0064-01)', url: 'https://www23.statcan.gc.ca/imdb/p2SV.pl?Function=getSurvey&SDDS=3701', description: 'Primary source for starting and mid-career salaries across all programs, cross-referenced by NOC occupation codes and highest level of educational attainment.' },
  { name: 'OUAC Graduate Outcomes Survey', url: 'https://www.ouac.on.ca/', description: 'Ontario-specific graduate employment rates and first-year median salaries by university and field of study — used for all Ontario institutions.' },
  { name: 'BC Labour Market Outlook — Province of British Columbia', url: 'https://www.workbc.ca/Labour-Market-Information/BC-s-Economy/Labour-Market-Outlook.aspx', description: 'BC-specific graduate wage data by occupation, used to calibrate UBC, SFU, and UVic starting salaries.' },
  { name: 'Engineers Canada — Salary Survey', url: 'https://engineerscanada.ca/', description: 'National engineering compensation benchmarks by discipline (Electrical, Mechanical, Chemical, Civil, etc.) used for all engineering program salary figures.' },
  { name: 'CPA Canada — Compensation Study', url: 'https://www.cpacanada.ca/', description: 'Accounting and financial management starting salaries — used for Waterloo AFM, Laurier BBA, and all commerce/business programs.' },
  { name: 'CAUT Almanac of Post-Secondary Education in Canada', url: 'https://www.caut.ca/resources/almanac', description: 'Graduate employment outcomes and earnings by field of study, used as a supplementary check for Arts, Social Sciences, and Humanities programs.' },
  { name: 'Nursing Association of Canada — Compensation Data', url: 'https://www.cna-aiic.ca/', description: 'RN starting salary benchmarks by province used for all 15 nursing programs across Ontario, BC, Alberta, and Atlantic Canada.' },
  { name: 'LinkedIn Salary Insights — Canada', url: 'https://www.linkedin.com/salary/', description: 'Used to validate mid-career (10-year) salary estimates across all disciplines and to cross-check regional salary differences between provinces.' },
];

const COL_SOURCES = [
  { name: 'Numbeo — Cost of Living in Canada (All Cities)', url: 'https://www.numbeo.com/cost-of-living/country_result.jsp?country=Canada', description: 'City-level breakdowns for rent, groceries, transit, and consumer goods. Used for all 20 cities including smaller markets (Saskatoon, Fredericton, Guelph, Oshawa).' },
  { name: 'CMHC Rental Market Report — Canada', url: 'https://www.cmhc-schl.gc.ca/housing-observer-online/rental-market-report', description: "Canada's authoritative rental price source. Used to set monthly rent estimates for all 20 cities, with 1BR averages as the baseline for a single post-grad renter." },
  { name: 'Statistics Canada CPI — Consumer Price Index by City', url: 'https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810000401', description: 'CPI city-level data used to adjust monthly expense estimates (groceries, transit, utilities) across all cities and validate Numbeo figures.' },
  { name: 'CMHC Housing Market Information Portal', url: 'https://www.cmhc-schl.gc.ca/housing-observer-online/rental-market-report', description: 'Supplementary portal data for smaller markets: Fredericton, St. John\'s, Saskatoon, and Windsor — cities with thinner third-party data.' },
];

export default function Methodology() {
  return (
    <div className="flex-1 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-bold text-brand uppercase tracking-widest">How It Works</span>
          <h1 className="text-4xl font-extrabold text-navy tracking-tight mt-2 mb-4">Data Methodology</h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Every number in CampusROI comes from a real, citable source. We individually researched all 25 universities across 9 provinces — tuition from each registrar, co-op earnings from institutional reports, and salaries from national labour surveys. Here's exactly how.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-4 py-2 rounded-full">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last updated: January 2025
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-4 py-2 rounded-full">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              25 universities researched
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-4 py-2 rounded-full">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              20 cities covered
            </div>
          </div>
        </div>

        {/* Tuition */}
        <Section title="Tuition Data — All 25 Universities">
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Annual tuition figures are sourced directly from each university's official registrar or student accounts website. We pulled the most recent domestic student fees for 2024–25 for each specific program listed. Where a faculty charges a flat rate across programs (e.g., Western Engineering), that rate is used. Where deregulated per-program rates apply (e.g., UofT Engineering Science vs. Arts & Science CS), each program's rate is used individually. All figures are validated against Statistics Canada's Tuition and Living Accommodation Costs survey (Table 37-10-0011-01).
          </p>
          {TUITION_SOURCES.map((g) => (
            <UniGroup key={g.province} province={g.province} schools={g.schools} />
          ))}
        </Section>

        {/* Co-op */}
        <Section title="Co-op Salary Data">
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Co-op salary averages represent gross pay per 4-month work term before taxes. The University of Waterloo publishes the only comprehensive annual earnings report by faculty in Canada — this is the primary benchmark. For schools without published earnings reports (York, Brock, Windsor, Memorial, etc.), we use Glassdoor and LinkedIn filtered to Canadian co-op/intern postings in the relevant city and discipline. Figures represent the 50th percentile, not the average, to avoid distortion from high outliers (FAANG placements, etc.).
          </p>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden mb-4">
            {COOP_SOURCES.map((s) => <Source key={s.name} {...s} />)}
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
            <span className="font-semibold">Note on co-op terms:</span> The number of co-op terms for each program reflects the typical number completed by students in the program, not the maximum possible. Waterloo Engineering students can complete up to 6 terms; the figure used (6) reflects the strong majority who complete the full sequence.
          </div>
        </Section>

        {/* Starting salaries */}
        <Section title="Starting & Mid-Career Salary Data">
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Starting salaries represent the median first-year total compensation for graduates entering their field within 12 months of graduation. Mid-career figures represent the median salary at approximately 10 years of experience. All figures are in 2024 Canadian dollars. National sources (Statistics Canada LFS) provide the baseline; province-specific and sector-specific sources are used to calibrate for regional labour market differences (e.g., Alberta oil & gas premium for petroleum engineers, BC tech premium for SFU/UBC CS graduates).
          </p>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            {SALARY_SOURCES.map((s) => <Source key={s.name} {...s} />)}
          </div>
        </Section>

        {/* Cost of living */}
        <Section title="Cost of Living — All 20 Cities">
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Monthly cost of living estimates cover rent (1-bedroom, off-campus), groceries, transit, utilities, and personal expenses for a single person. Annual totals are calculated as (monthlyRent + monthlyExpenses) × 12. For smaller cities (Fredericton, St. John's, Windsor, Oshawa, Guelph), Numbeo data was supplemented with CMHC rental market data due to lower third-party data volume. All figures reflect post-graduation living costs, not student-specific budgets.
          </p>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden mb-6">
            {COL_SOURCES.map((s) => <Source key={s.name} {...s} />)}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              ['Toronto', '$48,000/yr'], ['Vancouver', '$52,000/yr'], ['Victoria', '$44,400/yr'],
              ['Ottawa', '$39,600/yr'], ['Waterloo/KW', '$36,000/yr'], ['Hamilton', '$37,200/yr'],
              ['London', '$36,000/yr'], ['Kingston', '$35,400/yr'], ['Guelph', '$36,000/yr'],
              ['Oshawa', '$34,800/yr'], ['Windsor', '$31,200/yr'], ['Montreal', '$36,000/yr'],
              ['Quebec City', '$33,600/yr'], ['Calgary', '$43,200/yr'], ['Edmonton', '$37,200/yr'],
              ['Winnipeg', '$33,600/yr'], ['Saskatoon', '$31,200/yr'], ['Halifax', '$37,200/yr'],
              ["St. John's", '$31,200/yr'], ['Fredericton', '$28,800/yr'],
            ].map(([city, cost]) => (
              <div key={city} className="bg-slate-50 rounded-lg px-3 py-2.5 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">{city}</span>
                <span className="text-xs font-bold text-navy">{cost}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Financial model */}
        <Section title="Financial Model & Formulas">
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            All projections are calculated in real (inflation-adjusted) Canadian dollars. The model runs 10 years post-graduation, comparing two scenarios: completing the selected degree vs. entering the workforce immediately at an entry-level wage without post-secondary.
          </p>

          <Formula
            name="Net Degree Cost"
            formula="Net Cost = (Annual Tuition × Years) − (Co-op Terms × Avg Term Salary × 0.72) − (Avg Bursary × Years)"
            explanation="The 0.72 multiplier accounts for an approximate 28% effective tax rate on co-op income (CPP, EI, federal + provincial income tax for a typical co-op salary range). The average annual bursary of $2,500 is based on Statistics Canada's survey of university financial aid."
          />

          <Formula
            name="Net Worth — With Degree"
            formula="NW[yr] = NW[yr−1] × (1 + investmentReturn) + max((salary − costOfLiving − annualLoanPayment) × 0.20, 0)"
            explanation="Starting at year 0 (graduation), 20% of disposable income after living costs and loan repayment is invested annually. Net worth compounds at the selected investment return rate (default 7%, representing the historical real return of a diversified equity portfolio). Net worth starts negative if a student loan is carried."
          />

          <Formula
            name="Net Worth — Without Degree"
            formula="NW[yr] = NW[yr−1] × (1 + investmentReturn) + max((income − costOfLiving + tuitionSaved) × 0.30, 0)"
            explanation="The no-degree baseline starts at $42,000/year (median Canadian entry-level wage without post-secondary). During years the degree student would be in school, the no-degree worker also invests the tuition savings. A higher 30% savings rate is applied during university years."
          />

          <Formula
            name="Loan Repayment (Standard Amortization)"
            formula="Monthly Payment = P × [r(1+r)^n] / [(1+r)^n − 1]"
            explanation="Where P = net cost × loan percentage, r = monthly interest rate (annual ÷ 12), n = 120 months (10-year repayment). This matches the NSLSC/OSAP standard amortization formula. Loan principal is based on net cost (after co-op earnings and bursaries), not gross tuition."
          />

          <Formula
            name="Break-even Year"
            formula="Break-even = first year where NW_withDegree[yr] ≥ NW_withoutDegree[yr]"
            explanation="The first year post-graduation where the degree holder's cumulative net worth catches up to the no-degree baseline. If this never occurs within 10 years, it is reported as >10 years."
          />
        </Section>

        {/* Assumptions */}
        <Section title="Key Assumptions & Limitations">
          <div className="space-y-4 text-sm text-slate-500 leading-relaxed">
            {[
              { label: 'Investment returns', body: 'Default 7% represents the historical average annual real return of the S&P/TSX Composite Index over 20-year periods (Bank of Canada data). This assumes consistent market participation — actual returns will vary.' },
              { label: 'Salary growth', body: 'Default 4% per year is based on the Bank of Canada\'s wage growth projections and Statistics Canada\'s average annual compensation increase data (2015–2024).' },
              { label: 'Regional salary differences', body: 'All starting salary figures reflect the median for graduates working in any Canadian city — not specifically in the city where their school is located. A UWindsor CS grad working in Toronto will earn more than a UWindsor grad staying in Windsor; the figures are Canada-wide medians.' },
              { label: 'Individual variation', body: 'All figures represent median outcomes. Actual salaries, tuition, and investment returns vary significantly by individual circumstances, employer, economic conditions, and career choices.' },
              { label: 'Non-financial value', body: 'This tool models financial return only. Education has significant non-financial value (career satisfaction, social networks, credentials) that is not captured here.' },
              { label: 'Taxes', body: 'The model does not apply full marginal income tax rates to net worth projections. It applies simplified savings rates (20% of disposable income) which implicitly account for taxes and other deductions.' },
              { label: 'Quebec tuition', body: 'Quebec domestic students pay regulated tuition rates that are substantially lower than other provinces due to the provincial subsidy structure. McGill, Concordia, and Laval figures reflect these regulated rates for Quebec residents.' },
            ].map(({ label, body }) => (
              <div key={label} className="flex gap-3">
                <span className="text-brand font-bold mt-0.5">→</span>
                <p><span className="font-semibold text-slate-700">{label}:</span> {body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Update cadence */}
        <div className="bg-slate-50 rounded-2xl p-6 text-sm text-slate-500">
          <p className="font-semibold text-navy mb-1.5">Data Review Cadence</p>
          <p className="leading-relaxed">
            All data in CampusROI is reviewed and updated every 6 months — in January and July — to reflect the most recent academic year tuition schedules, published salary surveys, and Statistics Canada releases. The current dataset reflects 2024–25 tuition rates and 2023–24 salary data. Tuition for all 25 universities is re-pulled directly from each university's registrar page at each update cycle.
          </p>
        </div>

      </div>
    </div>
  );
}
