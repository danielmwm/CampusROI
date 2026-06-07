import { useState } from 'react';
import programsData from '../../data/programs.json';
import careersData from '../../data/careers.json';
import { getCareerOptions } from '../../pages/Calculator';

const PROVINCES = ['Ontario', 'British Columbia', 'Quebec', 'Alberta'];
const CITIES = ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Waterloo/KW', 'Ottawa'];
const CURRENT_YEAR = new Date().getFullYear();
const START_YEARS = Array.from({ length: 6 }, (_, i) => CURRENT_YEAR - 1 + i);

const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394A3B8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`;

function Label({ children, htmlFor, hint }) {
  return (
    <div className="flex items-baseline justify-between mb-1">
      <label htmlFor={htmlFor} className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        {children}
      </label>
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </div>
  );
}

function Select({ id, value, onChange, children, disabled }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full text-sm bg-white border border-slate-200 text-slate-800 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy transition-colors appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      style={{ backgroundImage: chevron, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '14px', paddingRight: '32px' }}
    >
      {children}
    </select>
  );
}

function Toggle({ value, onChange, options, disabled }) {
  return (
    <div className="flex border border-slate-200 rounded overflow-hidden">
      {options.map((opt) => {
        const active = opt.value === value;
        const isDisabled = disabled && opt.value === true;
        return (
          <button
            key={String(opt.value)}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange(opt.value)}
            className={`flex-1 py-1.5 text-xs font-medium transition-colors border-r border-slate-200 last:border-r-0 ${
              active ? 'bg-navy text-white' : 'bg-white text-slate-500 hover:bg-slate-50'
            } ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function RangeRow({ id, value, onChange, min, max, step, label, format }) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="text-xs text-slate-500 w-40 shrink-0">{label}</label>
      <input
        id={id}
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 accent-navy h-1 cursor-pointer"
      />
      <span className="text-xs font-semibold text-navy w-10 text-right">{format(value)}</span>
    </div>
  );
}

function DollarInput({ id, value, onChange, label, hint, suffix = '/yr' }) {
  return (
    <div>
      <Label htmlFor={id} hint={hint}>{label}</Label>
      <div className="flex border border-slate-200 rounded overflow-hidden">
        <span className="px-2.5 text-xs text-slate-400 bg-slate-50 border-r border-slate-200 flex items-center">$</span>
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="flex-1 text-sm text-slate-800 px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-navy min-w-0"
        />
        <span className="px-2.5 text-xs text-slate-400 bg-slate-50 border-l border-slate-200 flex items-center">{suffix}</span>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-slate-100" />;
}

export default function InputPanel({ inputs, onChange }) {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const universities = programsData.universities.filter(
    (u) => !inputs.province || u.province === inputs.province
  );
  const selectedUniversity = programsData.universities.find((u) => u.id === inputs.universityId);
  const programs = selectedUniversity?.programs ?? [];
  const selectedProgram = programs.find((p) => p.id === inputs.programId);
  const careerOptions = inputs.programId ? getCareerOptions(inputs.programId) : [];
  const selectedCareer = careerOptions.find((c) => c.id === inputs.careerId);

  const effectiveCoopSalary = inputs.coopSalaryOverride !== null
    ? inputs.coopSalaryOverride
    : (selectedProgram?.avgCoopSalary ?? 0);

  const defaultStartingSalary = selectedCareer?.startingSalary ?? selectedProgram?.avgStartingSalary ?? 0;
  const effectiveStartingSalary = inputs.startingSalaryOverride !== null
    ? inputs.startingSalaryOverride
    : defaultStartingSalary;

  const graduationYear = selectedProgram
    ? inputs.startYear + selectedProgram.years
    : inputs.startYear + 4;

  function handleProvinceChange(province) {
    onChange({ province, universityId: '', programId: '', careerId: null, startingSalaryOverride: null });
  }
  function handleUniversityChange(universityId) {
    onChange({ universityId, programId: '', coopSalaryOverride: null, annualTuitionOverride: null, careerId: null, startingSalaryOverride: null });
  }
  function handleProgramChange(programId) {
    const uni = programsData.universities.find((u) => u.id === inputs.universityId);
    const prog = uni?.programs.find((p) => p.id === programId);
    onChange({ programId, coopSalaryOverride: null, annualTuitionOverride: null, annualScholarship: 0, careerId: null, startingSalaryOverride: null, coopTerms: prog?.coopTerms ?? 4, hasCoop: prog?.coopAvailable ?? false });
  }
  function handleCareerChange(careerId) {
    onChange({ careerId: careerId || null, startingSalaryOverride: null });
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-navy">Your Scenario</h2>
        <p className="text-xs text-slate-400 mt-0.5">Select a program to get started</p>
      </div>

      <Divider />

      {/* — PROGRAM — */}
      <div className="space-y-3">
        <div>
          <Label htmlFor="province">Province</Label>
          <Select id="province" value={inputs.province} onChange={handleProvinceChange}>
            <option value="">All provinces</option>
            {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
          </Select>
        </div>
        <div>
          <Label htmlFor="university">University</Label>
          <Select id="university" value={inputs.universityId} onChange={handleUniversityChange} disabled={!universities.length}>
            <option value="">Select university</option>
            {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </Select>
        </div>
        <div>
          <Label htmlFor="program">Program</Label>
          <Select id="program" value={inputs.programId} onChange={handleProgramChange} disabled={!programs.length}>
            <option value="">Select program</option>
            {programs.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.faculty}</option>)}
          </Select>
        </div>
        {selectedProgram && (() => {
          const effectiveTuition = inputs.annualTuitionOverride !== null
            ? inputs.annualTuitionOverride
            : selectedProgram.annualTuition;
          const afterScholarship = Math.max(effectiveTuition - (inputs.annualScholarship ?? 0), 0);
          return (
            <>
              <DollarInput
                id="tuition"
                label="Annual tuition"
                hint={`est. $${selectedProgram.annualTuition.toLocaleString()}`}
                value={effectiveTuition}
                onChange={(v) => onChange({ annualTuitionOverride: v })}
              />
              <DollarInput
                id="scholarship"
                label="Scholarship / Awards"
                hint="optional · per year"
                value={inputs.annualScholarship ?? 0}
                onChange={(v) => onChange({ annualScholarship: v })}
              />
              {(inputs.annualScholarship > 0) && (
                <p className="text-xs text-brand font-medium -mt-1">
                  Effective tuition: ${afterScholarship.toLocaleString()}/yr after scholarship
                </p>
              )}
            </>
          );
        })()}
      </div>

      <Divider />

      {/* — ON-CAMPUS COSTS — always visible, prominent */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-navy uppercase tracking-widest">On-Campus Costs</p>

        <div>
          <Label hint="optional">Residence</Label>
          <Toggle
            value={inputs.hasResidence}
            onChange={(v) => onChange({ hasResidence: v })}
            options={[{ label: 'On campus', value: true }, { label: 'Off campus / home', value: false }]}
          />
          {inputs.hasResidence && (
            <div className="mt-2">
              <DollarInput
                id="residenceCost"
                label="Annual residence cost"
                hint="edit to match your school"
                value={inputs.annualResidenceCost}
                onChange={(v) => onChange({ annualResidenceCost: v })}
              />
            </div>
          )}
        </div>

        <div>
          <Label hint="optional">Meal Plan</Label>
          <Toggle
            value={inputs.hasMealPlan}
            onChange={(v) => onChange({ hasMealPlan: v })}
            options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
          />
          {inputs.hasMealPlan && (
            <div className="mt-2">
              <DollarInput
                id="mealPlanCost"
                label="Annual meal plan cost"
                hint="edit to match your school"
                value={inputs.annualMealPlanCost}
                onChange={(v) => onChange({ annualMealPlanCost: v })}
              />
            </div>
          )}
        </div>
      </div>

      <Divider />

      {/* — CO-OP — */}
      <div className="space-y-3">
        <div>
          <Label>Co-op</Label>
          <Toggle
            value={inputs.hasCoop}
            onChange={(v) => onChange({ hasCoop: v })}
            disabled={selectedProgram && !selectedProgram.coopAvailable}
            options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
          />
          {selectedProgram && !selectedProgram.coopAvailable && (
            <p className="text-xs text-slate-400 mt-1">Not available for this program</p>
          )}
        </div>
        {inputs.hasCoop && (
          <>
            <div>
              <Label htmlFor="coopTerms"># of Co-op Terms</Label>
              <Select id="coopTerms" value={inputs.coopTerms} onChange={(v) => onChange({ coopTerms: parseInt(v) })}>
                {[2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} terms</option>)}
              </Select>
            </div>
            <DollarInput
              id="coopSalary"
              label="Gross pay per 4-month term"
              hint={selectedProgram?.avgCoopSalary ? `est. $${selectedProgram.avgCoopSalary.toLocaleString()}` : 'your offer'}
              suffix="/term"
              value={effectiveCoopSalary}
              onChange={(v) => onChange({ coopSalaryOverride: v })}
            />
            <p className="text-xs text-slate-400 -mt-1">
              Net take-home is ~72% after tax/CPP/EI — used in the cost calculation.
            </p>
          </>
        )}
      </div>

      <Divider />

      {/* — CAREER PATH — */}
      <div className="space-y-3">
        <div>
          <Label htmlFor="career">Career Path</Label>
          <Select
            id="career"
            value={inputs.careerId ?? ''}
            onChange={handleCareerChange}
            disabled={!careerOptions.length}
          >
            <option value="">{careerOptions.length ? 'Program average (all careers)' : 'Select a program first'}</option>
            {careerOptions.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </Select>
          {selectedCareer && (
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedCareer.note}</p>
          )}
        </div>
        {(selectedCareer || selectedProgram) && (
          <DollarInput
            id="startingSalary"
            label="Starting salary"
            hint={`est. $${defaultStartingSalary.toLocaleString()}`}
            value={effectiveStartingSalary}
            onChange={(v) => onChange({ startingSalaryOverride: v })}
          />
        )}
        {selectedCareer && (
          <p className="text-xs text-slate-400 -mt-1">
            Typical growth: <span className="font-medium text-slate-600">{selectedCareer.salaryGrowthRate}%/yr</span>
            <span className="text-slate-300 mx-1">·</span>
            <button
              className="text-brand hover:underline"
              onClick={() => onChange({ salaryGrowthRate: selectedCareer.salaryGrowthRate })}
            >
              apply to model
            </button>
          </p>
        )}
      </div>

      <Divider />

      {/* — TIMELINE — */}
      <div className="space-y-3">
        <div>
          <Label htmlFor="startYear">Start Year</Label>
          <Select id="startYear" value={inputs.startYear} onChange={(v) => onChange({ startYear: parseInt(v) })}>
            {START_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </Select>
          {selectedProgram && (
            <p className="text-xs text-slate-400 mt-1">
              Graduating in <span className="font-semibold text-navy">{graduationYear}</span>
              {' '}({selectedProgram.years}-year program)
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Post-grad city</Label>
          <Select id="city" value={inputs.city} onChange={(v) => onChange({ city: v, costOfLivingOverride: null })}>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
          {inputs.city && programsData.costOfLiving[inputs.city] && (() => {
            const defaultCost = programsData.costOfLiving[inputs.city].annualTotal;
            const effectiveCost = inputs.costOfLivingOverride !== null ? inputs.costOfLivingOverride : defaultCost;
            return (
              <DollarInput
                id="costOfLiving"
                label="Annual living costs"
                hint={`default $${defaultCost.toLocaleString()}`}
                value={effectiveCost}
                onChange={(v) => onChange({ costOfLivingOverride: v })}
              />
            );
          })()}
        </div>
      </div>

      <Divider />

      {/* — ADVANCED — */}
      <div>
        <button
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wide hover:text-slate-700 transition-colors"
        >
          <span>Advanced & Assumptions</span>
          <svg className={`w-3.5 h-3.5 transition-transform ${advancedOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {advancedOpen && (
          <div className="mt-4 space-y-4">
            <p className="text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded p-2.5">
              Pre-filled with national averages. Edit any value to match your situation.
            </p>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Model settings</p>
              <RangeRow id="salaryGrowth" value={inputs.salaryGrowthRate} onChange={(v) => onChange({ salaryGrowthRate: v })} min={1} max={10} step={0.5} label="Salary growth / yr" format={(v) => `${v}%`} />
              <RangeRow id="investReturn" value={inputs.investmentReturn} onChange={(v) => onChange({ investmentReturn: v })} min={3} max={12} step={0.5} label="Investment return" format={(v) => `${v}%`} />
              <RangeRow id="loanInterest" value={inputs.loanInterestRate} onChange={(v) => onChange({ loanInterestRate: v })} min={3} max={10} step={0.25} label="Loan interest rate" format={(v) => `${v}%`} />
              <RangeRow id="loanPercent" value={inputs.loanPercent} onChange={(v) => onChange({ loanPercent: v })} min={0} max={100} step={5} label="% financed by loans" format={(v) => `${v}%`} />
            </div>
            <div className="space-y-3 pt-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Assumptions <span className="font-normal normal-case text-slate-400">(editable)</span></p>
              <DollarInput id="annualBursary" label="Annual scholarships / aid" hint="avg. $2,500" value={inputs.annualBursary} onChange={(v) => onChange({ annualBursary: v })} />
              <DollarInput id="baselineSalary" label="No-degree baseline salary" hint="Stats Can. median" value={inputs.baselineSalary} onChange={(v) => onChange({ baselineSalary: v })} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
