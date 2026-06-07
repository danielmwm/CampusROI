import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ReferenceLine, ResponsiveContainer,
} from 'recharts';
import { formatCurrencyShort, formatCurrency } from '../../utils/formatting';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded shadow-md p-3 min-w-[180px]">
      <p className="text-xs font-semibold text-slate-600 mb-1.5">Year {label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-sm inline-block" style={{ background: entry.color }} />
            {entry.name}
          </span>
          <span className="font-semibold text-navy">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function NetWorthChart({ withDegree, withoutDegree, breakEvenYear, graduationYear }) {
  const [view, setView] = useState(10);

  const allData = withDegree.map((d, i) => ({
    year: d.year,
    calYear: graduationYear ? graduationYear + d.year : null,
    'With Degree': d.netWorth,
    'Without Degree': withoutDegree[i]?.netWorth ?? 0,
  }));

  const data = allData.filter((d) => d.year <= view);
  const breakEvenInView = breakEvenYear !== null && breakEvenYear <= view ? breakEvenYear : null;

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-end mb-3">
        <div className="flex border border-slate-200 rounded overflow-hidden text-xs">
          {[5, 10].map((yr) => (
            <button
              key={yr}
              onClick={() => setView(yr)}
              className={`px-3 py-1 font-medium border-r last:border-r-0 border-slate-200 transition-colors ${
                view === yr ? 'bg-navy text-white' : 'bg-white text-slate-400 hover:bg-slate-50'
              }`}
            >
              {yr} yr
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 16, left: 4, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              tickFormatter={(v) => graduationYear ? String(graduationYear + v) : `Yr ${v}`}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              tickFormatter={formatCurrencyShort}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="square" iconSize={8} />
            {breakEvenInView !== null && (
              <ReferenceLine
                x={breakEvenInView}
                stroke="#22C55E"
                strokeDasharray="4 4"
                label={{ value: 'break-even', fill: '#16A34A', fontSize: 10, fontWeight: 600, position: 'insideTopRight' }}
              />
            )}
            <Line type="monotone" dataKey="With Degree" stroke="#0F172A" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="Without Degree" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 3" dot={false} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
