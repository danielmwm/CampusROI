import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatCurrencyShort } from '../../utils/formatting';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 rounded shadow-md p-3">
      <p className="text-xs font-semibold text-slate-700">{d.label}</p>
      <p className="text-sm font-bold text-navy mt-0.5">{formatCurrency(d.displayValue)}</p>
      {d.isOffset && <p className="text-xs text-slate-400 mt-0.5">reduces net cost</p>}
    </div>
  );
};

export default function CostBreakdownChart({ totalTuition, totalResidence, totalMealPlan, coopEarnings, bursaryTotal, netCost }) {
  const raw = [
    { label: 'Tuition', displayValue: totalTuition, color: '#0F172A', isOffset: false },
    totalResidence > 0 && { label: 'Residence', displayValue: totalResidence, color: '#334155', isOffset: false },
    totalMealPlan > 0 && { label: 'Meal Plan', displayValue: totalMealPlan, color: '#475569', isOffset: false },
    coopEarnings > 0 && { label: 'Co-op offset', displayValue: coopEarnings, color: '#22C55E', isOffset: true },
    bursaryTotal > 0 && { label: 'Aid / bursaries', displayValue: bursaryTotal, color: '#86EFAC', isOffset: true },
    { label: 'Net Cost', displayValue: netCost, color: '#0EA5E9', isOffset: false },
  ].filter(Boolean);

  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={raw} margin={{ top: 4, right: 8, left: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} tickFormatter={formatCurrencyShort} width={56} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="displayValue" radius={[2, 2, 0, 0]}>
            {raw.map((entry, i) => <Cell key={i} fill={entry.color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
