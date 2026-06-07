export default function InsightCards({ insights }) {
  if (!insights?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-md p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Key Insights</p>
      <div className="space-y-2">
        {insights.map((insight, i) => (
          <div key={i} className="flex gap-2.5 text-sm text-slate-600">
            <span className="text-brand font-bold mt-0.5 shrink-0">→</span>
            <p className="leading-relaxed">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
