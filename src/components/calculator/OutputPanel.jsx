import SummaryCards from './SummaryCards';
import InsightCards from './InsightCards';
import NetWorthChart from '../charts/NetWorthChart';
import CostBreakdownChart from '../charts/CostBreakdownChart';
import SalaryProgressionChart from '../charts/SalaryProgressionChart';
import { encodeScenarioToUrl } from '../../utils/urlEncoding';

const fmt = (n) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);

function Panel({ title, description, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-navy">{title}</h3>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border border-dashed border-slate-300 rounded-md p-16 flex flex-col items-center justify-center text-center">
      <svg className="w-8 h-8 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
      <p className="text-sm font-semibold text-slate-500">Select a program to see your ROI</p>
      <p className="text-xs text-slate-400 mt-1 max-w-xs">Choose a university and program from the panel on the left.</p>
    </div>
  );
}

export default function OutputPanel({ results, inputs }) {
  if (!results) return <EmptyState />;

  const { costBreakdown, withDegree, withoutDegree, breakEvenYear, startingSalary, insights, graduationYear } = results;
  const tenYearNetWorth = withDegree[withDegree.length - 1]?.netWorth ?? 0;

  function handleShare() {
    const url = encodeScenarioToUrl(inputs);
    navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard!')).catch(() => prompt('Copy this link:', url));
  }

  return (
    <div className="space-y-3">
      <SummaryCards
        netCost={costBreakdown.netCost}
        startingSalary={startingSalary}
        breakEvenYear={breakEvenYear}
        tenYearNetWorth={tenYearNetWorth}
      />

      <Panel
        title="Net Worth Projection"
        description={`Degree vs. entering workforce at ${fmt(inputs.baselineSalary)}/yr with no degree`}
      >
        <NetWorthChart withDegree={withDegree} withoutDegree={withoutDegree} breakEvenYear={breakEvenYear} graduationYear={graduationYear} />
      </Panel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Panel
          title="Degree Cost Breakdown"
          description="Total costs vs. co-op earnings and aid offsets"
        >
          <CostBreakdownChart
            totalTuition={costBreakdown.totalTuition}
            totalResidence={costBreakdown.totalResidence}
            totalMealPlan={costBreakdown.totalMealPlan}
            coopEarnings={costBreakdown.coopEarnings}
            bursaryTotal={costBreakdown.bursaryTotal}
            netCost={costBreakdown.netCost}
          />
        </Panel>

        <Panel
          title="Salary Progression"
          description={`${fmt(startingSalary)} starting · ${inputs.salaryGrowthRate}% annual growth`}
        >
          <SalaryProgressionChart startingSalary={startingSalary} salaryGrowthRate={inputs.salaryGrowthRate} />
        </Panel>
      </div>

      <InsightCards insights={insights} />

      <div className="flex justify-end pt-1">
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-navy border border-slate-200 hover:border-slate-300 px-3 py-2 rounded transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share scenario
        </button>
      </div>
    </div>
  );
}
