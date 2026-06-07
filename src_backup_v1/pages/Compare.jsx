import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import programsData from '../data/programs.json';
import { calculateNetDegreeCost, calculateLoanRepayment, calculateNetWorthWithDegree, calculateNetWorthWithoutDegree, calculateBreakevenYear } from '../utils/calculations';
import { formatCurrency, formatCurrencyShort } from '../utils/formatting';
import { encodeCompareToUrl } from '../utils/urlEncoding';

const PROVINCES = ['Ontario', 'British Columbia', 'Quebec', 'Alberta'];
const CITIES = ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Waterloo/KW', 'Ottawa'];
const GRAD_YEARS = [2026, 2027, 2028, 2029, 2030];
const COLORS = ['#0F172A', '#22C55E', '#3B82F6'];
const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394A3B8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`;

function Sel({ value, onChange, children, disabled }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full bg-white border border-slate-200 text-slate-700 rounded text-xs px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-navy appearance-none cursor-pointer disabled:opacity-40"
      style={{ backgroundImage: chevron, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '12px', paddingRight: '28px' }}
    >
      {children}
    </select>
  );
}

function ScenarioColumn({ index, scenario, sharedInputs, onScenarioChange }) {
  const universities = programsData.universities.filter((u) => !sharedInputs.province || u.province === sharedInputs.province);
  const selectedUniversity = programsData.universities.find((u) => u.id === scenario.universityId);
  const programs = selectedUniversity?.programs ?? [];
  const selectedProgram = programs.find((p) => p.id === scenario.programId);
  const color = COLORS[index];

  function handleUniversity(universityId) {
    onScenarioChange(index, { universityId, programId: '', hasCoop: true, coopTerms: 4 });
  }
  function handleProgram(programId) {
    const uni = programsData.universities.find((u) => u.id === scenario.universityId);
    const prog = uni?.programs.find((p) => p.id === programId);
    onScenarioChange(index, { programId, hasCoop: prog?.coopAvailable ?? false, coopTerms: prog?.coopTerms ?? 4 });
  }

  return (
    <div className="bg-white border border-slate-200 rounded-md p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
        <span className="text-xs font-bold text-navy uppercase tracking-wide">Program {index + 1}</span>
      </div>
      <Sel value={scenario.universityId} onChange={handleUniversity}>
        <option value="">Select university</option>
        {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
      </Sel>
      <Sel value={scenario.programId} onChange={handleProgram} disabled={!programs.length}>
        <option value="">Select program</option>
        {programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </Sel>
      {selectedProgram ? (
        <>
          <div className="flex border border-slate-200 rounded overflow-hidden">
            {[{ label: 'Co-op', val: true }, { label: 'No co-op', val: false }].map((opt) => {
              const disabled = opt.val && !selectedProgram.coopAvailable;
              const active = opt.val === scenario.hasCoop;
              return (
                <button key={String(opt.val)} disabled={disabled} onClick={() => onScenarioChange(index, { hasCoop: opt.val })}
                  className={`flex-1 py-1 text-xs font-medium border-r last:border-r-0 border-slate-200 transition-colors ${active ? 'bg-navy text-white' : 'bg-white text-slate-400 hover:bg-slate-50'} ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                  {opt.label}
                </button>
              );
            })}
          </div>
          <div className="text-xs text-slate-400 pt-1 border-t border-slate-100 space-y-0.5">
            <p>Tuition: <span className="font-medium text-slate-600">${selectedProgram.annualTuition.toLocaleString()}/yr</span></p>
            <p>Starting salary: <span className="font-medium text-slate-600">{formatCurrency(selectedProgram.avgStartingSalary)}</span></p>
          </div>
        </>
      ) : (
        <p className="text-xs text-slate-300 text-center py-4">Select a program above</p>
      )}
    </div>
  );
}

const CompareTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded shadow-md p-3 min-w-[180px]">
      <p className="text-xs font-semibold text-slate-600 mb-1.5">Year {label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-sm" style={{ background: entry.color }} />
            <span className="truncate max-w-[100px]">{entry.name}</span>
          </span>
          <span className="font-semibold text-navy">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};

const DEFAULT_SCENARIO = { universityId: '', programId: '', hasCoop: true, coopTerms: 4 };

export default function Compare() {
  const [sharedInputs, setSharedInputs] = useState({
    province: '', graduationYear: 2026, city: 'Toronto',
    hasResidence: false, annualResidenceCost: 13200,
    hasMealPlan: false, annualMealPlanCost: 6200,
    salaryGrowthRate: 4, investmentReturn: 7,
    loanInterestRate: 6.5, loanPercent: 50,
    annualBursary: 2500, baselineSalary: 42000,
  });
  const [scenarios, setScenarios] = useState([{ ...DEFAULT_SCENARIO }, { ...DEFAULT_SCENARIO }, { ...DEFAULT_SCENARIO }]);

  function handleSharedChange(updates) { setSharedInputs((p) => ({ ...p, ...updates })); }
  function handleScenarioChange(index, updates) {
    setScenarios((prev) => { const next = [...prev]; next[index] = { ...next[index], ...updates }; return next; });
  }

  const scenarioResults = useMemo(() => scenarios.map((scenario) => {
    const university = programsData.universities.find((u) => u.id === scenario.universityId);
    const program = university?.programs.find((p) => p.id === scenario.programId);
    if (!program) return null;
    const costBreakdown = calculateNetDegreeCost(program.annualTuition, program.years, scenario.hasCoop && program.coopAvailable, scenario.coopTerms, program.avgCoopSalary, {
      hasResidence: sharedInputs.hasResidence, annualResidenceCost: sharedInputs.annualResidenceCost,
      hasMealPlan: sharedInputs.hasMealPlan, annualMealPlanCost: sharedInputs.annualMealPlanCost,
      annualBursary: sharedInputs.annualBursary,
    });
    const loanPrincipal = Math.max(costBreakdown.netCost, 0) * (sharedInputs.loanPercent / 100);
    const loan = calculateLoanRepayment(loanPrincipal, sharedInputs.loanInterestRate, 10);
    const costOfLiving = programsData.costOfLiving[sharedInputs.city]?.annualTotal ?? 42000;
    const withDegree = calculateNetWorthWithDegree(
      program.avgStartingSalary,
      sharedInputs.salaryGrowthRate,
      sharedInputs.investmentReturn,
      loan.monthlyPayment * 12,
      costOfLiving,
      loanPrincipal,
      sharedInputs.loanInterestRate
    );
    const withoutDegree = calculateNetWorthWithoutDegree(sharedInputs.baselineSalary, sharedInputs.salaryGrowthRate, sharedInputs.investmentReturn, program.annualTuition, costOfLiving, program.years);
    return { program, university, costBreakdown, withDegree, breakEvenYear: calculateBreakevenYear(withDegree, withoutDegree), startingSalary: program.avgStartingSalary };
  }), [scenarios, sharedInputs]);

  const hasResults = scenarioResults.some(Boolean);
  const chartData = useMemo(() => Array.from({ length: 11 }, (_, yr) => {
    const point = { year: yr };
    scenarioResults.forEach((r, i) => { if (r) point[`P${i + 1}`] = r.withDegree[yr]?.netWorth ?? 0; });
    return point;
  }), [scenarioResults]);

  const metrics = [
    { key: 'netCost', label: 'Net Degree Cost', format: (r) => formatCurrency(r.costBreakdown.netCost), best: 'low' },
    { key: 'salary', label: 'Starting Salary', format: (r) => formatCurrency(r.startingSalary), best: 'high' },
    { key: 'breakEven', label: 'Break-even', format: (r) => r.breakEvenYear !== null ? `Year ${r.breakEvenYear}` : '>10 yrs', best: 'low' },
    { key: 'netWorth', label: '10-Yr Net Worth', format: (r) => formatCurrency(r.withDegree[10]?.netWorth ?? 0), best: 'high' },
  ];

  function bestIndex(metric) {
    const valid = scenarioResults.map((r, i) => ({ r, i })).filter(({ r }) => r !== null);
    if (valid.length < 2) return -1;
    if (metric.key === 'netCost') return valid.reduce((b, c) => c.r.costBreakdown.netCost < b.r.costBreakdown.netCost ? c : b).i;
    if (metric.key === 'salary') return valid.reduce((b, c) => c.r.startingSalary > b.r.startingSalary ? c : b).i;
    if (metric.key === 'breakEven') { const v = valid.filter(({ r }) => r.breakEvenYear !== null); return v.length ? v.reduce((b, c) => c.r.breakEvenYear < b.r.breakEvenYear ? c : b).i : -1; }
    if (metric.key === 'netWorth') return valid.reduce((b, c) => (c.r.withDegree[10]?.netWorth ?? 0) > (b.r.withDegree[10]?.netWorth ?? 0) ? c : b).i;
    return -1;
  }

  function handleShare() {
    const url = encodeCompareToUrl(sharedInputs, scenarios);
    navigator.clipboard.writeText(url).then(() => alert('Link copied!')).catch(() => prompt('Copy:', url));
  }

  return (
    <div className="flex-1 bg-slate-50">
      {/* Page header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1.5">Tool</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">Compare Programs</h1>
          <p className="text-sm text-slate-500 mt-1.5 max-w-lg">Side-by-side comparison of up to 3 programs on the same chart — net cost, salary, break-even, and 10-year net worth.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Shared settings */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-4">
          <div className="flex items-baseline justify-between mb-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Shared Assumptions</p>
            <p className="text-xs text-slate-400">Applied equally to all programs below</p>
          </div>

          {/* Row 1: Program filters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">Province</p>
              <Sel value={sharedInputs.province} onChange={(v) => handleSharedChange({ province: v })}>
                <option value="">All provinces</option>
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </Sel>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">Graduation year</p>
              <Sel value={sharedInputs.graduationYear} onChange={(v) => handleSharedChange({ graduationYear: parseInt(v) })}>
                {GRAD_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </Sel>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">Post-grad city</p>
              <Sel value={sharedInputs.city} onChange={(v) => handleSharedChange({ city: v })}>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </Sel>
            </div>
          </div>

          {/* Row 2: Financial model */}
          <div className="border-t border-slate-100 pt-4 mb-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Financial Model</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">Annual salary growth</p>
                <Sel value={sharedInputs.salaryGrowthRate} onChange={(v) => handleSharedChange({ salaryGrowthRate: parseFloat(v) })}>
                  {[2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n}% / yr</option>)}
                </Sel>
                <p className="text-xs text-slate-400 mt-1">How fast your salary rises each year post-graduation.</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">Investment return</p>
                <Sel value={sharedInputs.investmentReturn} onChange={(v) => handleSharedChange({ investmentReturn: parseFloat(v) })}>
                  {[4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n}% / yr</option>)}
                </Sel>
                <p className="text-xs text-slate-400 mt-1">Annual return on money you invest from your disposable income. S&P/TSX historical average is ~7%.</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <p className="text-xs font-semibold text-slate-500">Student loan coverage</p>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium">affects chart</span>
                </div>
                <Sel value={sharedInputs.loanPercent} onChange={(v) => handleSharedChange({ loanPercent: parseFloat(v) })}>
                  <option value={0}>0% — paid from savings / family</option>
                  <option value={25}>25% — mostly self-funded</option>
                  <option value={50}>50% — half borrowed (default)</option>
                  <option value={75}>75% — mostly borrowed</option>
                  <option value={100}>100% — fully borrowed</option>
                </Sel>
                <p className="text-xs text-slate-400 mt-1">
                  What share of your net degree cost you take out as student loans.
                  Repaid over 10 years post-graduation — higher loans mean lower early net worth.
                </p>
              </div>
            </div>
          </div>

          {/* Row 3: On-campus costs */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">On-Campus Costs</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 items-start">

              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-semibold text-slate-500">Residence</p>
                <div className="flex items-center gap-2">
                  <div className="flex border border-slate-200 rounded overflow-hidden">
                    {[{ label: 'On campus', val: true }, { label: 'Off / home', val: false }].map((o) => (
                      <button key={String(o.val)} onClick={() => handleSharedChange({ hasResidence: o.val })}
                        className={`px-3 py-1.5 text-xs font-medium border-r last:border-0 border-slate-200 transition-colors ${sharedInputs.hasResidence === o.val ? 'bg-navy text-white' : 'bg-white text-slate-400 hover:bg-slate-50'}`}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                  {sharedInputs.hasResidence && (
                    <div className="flex border border-slate-200 rounded overflow-hidden text-xs">
                      <span className="px-2 text-slate-400 bg-slate-50 border-r border-slate-200 flex items-center">$</span>
                      <input type="number" value={sharedInputs.annualResidenceCost}
                        onChange={(e) => handleSharedChange({ annualResidenceCost: parseFloat(e.target.value) || 0 })}
                        className="w-20 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-navy" />
                      <span className="px-2 text-slate-400 bg-slate-50 border-l border-slate-200 flex items-center">/yr</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-semibold text-slate-500">Meal plan</p>
                <div className="flex items-center gap-2">
                  <div className="flex border border-slate-200 rounded overflow-hidden">
                    {[{ label: 'Yes', val: true }, { label: 'No', val: false }].map((o) => (
                      <button key={String(o.val)} onClick={() => handleSharedChange({ hasMealPlan: o.val })}
                        className={`px-3 py-1.5 text-xs font-medium border-r last:border-0 border-slate-200 transition-colors ${sharedInputs.hasMealPlan === o.val ? 'bg-navy text-white' : 'bg-white text-slate-400 hover:bg-slate-50'}`}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                  {sharedInputs.hasMealPlan && (
                    <div className="flex border border-slate-200 rounded overflow-hidden text-xs">
                      <span className="px-2 text-slate-400 bg-slate-50 border-r border-slate-200 flex items-center">$</span>
                      <input type="number" value={sharedInputs.annualMealPlanCost}
                        onChange={(e) => handleSharedChange({ annualMealPlanCost: parseFloat(e.target.value) || 0 })}
                        className="w-20 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-navy" />
                      <span className="px-2 text-slate-400 bg-slate-50 border-l border-slate-200 flex items-center">/yr</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Scenario columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {scenarios.map((scenario, i) => (
            <ScenarioColumn key={i} index={i} scenario={scenario} sharedInputs={sharedInputs} onScenarioChange={handleScenarioChange} />
          ))}
        </div>

        {hasResults ? (
          <>
            {/* Chart */}
            <div className="bg-white border border-slate-200 rounded-md p-4 mb-4">
              <p className="text-sm font-semibold text-navy mb-0.5">10-Year Net Worth Comparison</p>
              <p className="text-xs text-slate-400 mb-4">Cumulative net worth post-graduation</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 4, right: 16, left: 4, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} tickFormatter={(v) => `Yr ${v}`} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} tickFormatter={formatCurrencyShort} width={60} />
                    <Tooltip content={<CompareTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} iconType="square" iconSize={8} />
                    {scenarioResults.map((result, i) => result ? (
                      <Line key={i} type="monotone" dataKey={`P${i + 1}`} name={`${result.university.name} — ${result.program.name}`}
                        stroke={COLORS[i]} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    ) : null)}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Comparison table */}
            <div className="bg-white border border-slate-200 rounded-md overflow-hidden mb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-36">Metric</th>
                    {scenarioResults.map((result, i) => (
                      <th key={i} className="text-left px-4 py-3">
                        {result ? (
                          <div className="flex items-start gap-1.5">
                            <span className="w-2 h-2 rounded-sm mt-0.5 shrink-0" style={{ background: COLORS[i] }} />
                            <div>
                              <p className="text-xs font-semibold text-navy leading-tight">{result.program.name}</p>
                              <p className="text-xs text-slate-400">{result.university.name}</p>
                            </div>
                          </div>
                        ) : <span className="text-xs text-slate-300">—</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((metric) => {
                    const best = bestIndex(metric);
                    return (
                      <tr key={metric.key} className="border-b border-slate-50 last:border-0">
                        <td className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{metric.label}</td>
                        {scenarioResults.map((result, i) => (
                          <td key={i} className="px-4 py-3">
                            {result ? (
                              <span className={`text-sm font-semibold ${i === best ? 'text-brand' : 'text-navy'}`}>
                                {metric.format(result)}
                                {i === best && <span className="ml-1.5 text-xs text-brand font-normal">✓ best</span>}
                              </span>
                            ) : <span className="text-slate-300 text-xs">—</span>}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button onClick={handleShare} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-navy border border-slate-200 hover:border-slate-300 px-3 py-2 rounded transition-colors">
                Share comparison
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white border border-dashed border-slate-300 rounded-md p-16 text-center">
            <p className="text-sm font-semibold text-slate-500">Select at least one program above to see the comparison</p>
            <p className="text-xs text-slate-400 mt-1">Add programs in each column above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
