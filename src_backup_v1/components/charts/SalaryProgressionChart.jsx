import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatCurrencyShort } from '../../utils/formatting';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3">
      <p className="text-sm font-semibold text-slate-700 mb-1">Year {label}</p>
      <p className="text-sm text-slate-600">{formatCurrency(payload[0]?.value)}</p>
    </div>
  );
};

export default function SalaryProgressionChart({ startingSalary, salaryGrowthRate }) {
  const years = 10;
  const growthDecimal = salaryGrowthRate / 100;
  const data = Array.from({ length: years + 1 }, (_, i) => ({
    year: i,
    salary: Math.round(startingSalary * Math.pow(1 + growthDecimal, i)),
  }));

  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <defs>
            <linearGradient id="salaryGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0F172A" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#0F172A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            tickFormatter={(v) => `Yr ${v}`}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            tickFormatter={formatCurrencyShort}
            width={64}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="salary"
            stroke="#0F172A"
            strokeWidth={2.5}
            fill="url(#salaryGrad)"
            dot={false}
            activeDot={{ r: 5, fill: '#0F172A' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
