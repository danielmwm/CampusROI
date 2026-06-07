import { formatCurrency } from '../../utils/formatting';

export default function SummaryCards({ netCost, startingSalary, breakEvenYear, tenYearNetWorth }) {
  const cards = [
    { label: 'Net Degree Cost', value: formatCurrency(netCost), sub: 'after co-op & aid' },
    { label: 'Starting Salary', value: formatCurrency(startingSalary), sub: 'yr 1 post-grad' },
    { label: 'Break-even', value: breakEvenYear !== null ? `Yr ${breakEvenYear}` : '>10 yrs', sub: 'post-graduation' },
    { label: '10-Yr Net Worth', value: formatCurrency(tenYearNetWorth), sub: 'projected', accent: true },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-md overflow-hidden">
      {cards.map((c, i) => (
        <div
          key={i}
          className={`p-4 flex flex-col gap-0.5 border-r border-slate-200 last:border-r-0 ${
            c.accent ? 'bg-navy' : 'bg-white'
          } ${i >= 2 ? 'border-t border-slate-200 lg:border-t-0' : ''}`}
        >
          <span className={`text-xs font-semibold uppercase tracking-wider ${c.accent ? 'text-slate-400' : 'text-slate-400'}`}>
            {c.label}
          </span>
          <span className={`text-xl font-bold tracking-tight ${c.accent ? 'text-white' : 'text-navy'}`}>
            {c.value}
          </span>
          <span className={`text-xs ${c.accent ? 'text-slate-500' : 'text-slate-400'}`}>{c.sub}</span>
        </div>
      ))}
    </div>
  );
}
