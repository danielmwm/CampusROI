import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import InputPanel from '../components/calculator/InputPanel';
import OutputPanel from '../components/calculator/OutputPanel';
import programsData from '../data/programs.json';
import careersData from '../data/careers.json';
import {
  calculateNetDegreeCost,
  calculateLoanRepayment,
  calculateNetWorthWithDegree,
  calculateNetWorthWithoutDegree,
  calculateBreakevenYear,
  generateInsights,
} from '../utils/calculations';
import { decodeScenarioFromUrl } from '../utils/urlEncoding';

const CURRENT_YEAR = new Date().getFullYear();

export const DEFAULT_INPUTS = {
  province: '',
  universityId: '',
  programId: '',
  // Career
  careerId: null,
  startingSalaryOverride: null,
  // Co-op
  hasCoop: true,
  coopTerms: 4,
  coopSalaryOverride: null,
  // Tuition
  annualTuitionOverride: null,
  annualScholarship: 0,
  // Timeline
  startYear: CURRENT_YEAR,
  city: 'Toronto',
  costOfLivingOverride: null,
  // On-campus costs (optional)
  hasResidence: false,
  annualResidenceCost: 13200,
  hasMealPlan: false,
  annualMealPlanCost: 6200,
  // Advanced model settings
  salaryGrowthRate: 4,
  investmentReturn: 7,
  loanInterestRate: 6.5,
  loanPercent: 50,
  // Editable assumptions
  annualBursary: 2500,
  baselineSalary: 42000,
};

function useCalculatorInputs() {
  const [searchParams] = useSearchParams();
  const urlInputs = decodeScenarioFromUrl(searchParams.toString());
  const hasUrlInputs = Object.keys(urlInputs).length > 0;
  return useState(hasUrlInputs ? { ...DEFAULT_INPUTS, ...urlInputs } : DEFAULT_INPUTS);
}

export function getCareerOptions(programId) {
  const category = careersData.programCategories[programId];
  return category ? (careersData.categories[category]?.careers ?? []) : [];
}

export function getEffectiveStartingSalary(inputs, program) {
  if (inputs.startingSalaryOverride !== null) return inputs.startingSalaryOverride;
  if (inputs.careerId) {
    const careers = getCareerOptions(inputs.programId);
    const career = careers.find((c) => c.id === inputs.careerId);
    if (career) return career.startingSalary;
  }
  return program.avgStartingSalary;
}

export default function Calculator() {
  const [inputs, setInputs] = useCalculatorInputs();

  function handleChange(updates) {
    setInputs((prev) => ({ ...prev, ...updates }));
  }

  const results = useMemo(() => {
    const university = programsData.universities.find((u) => u.id === inputs.universityId);
    const program = university?.programs.find((p) => p.id === inputs.programId);
    if (!program) return null;

    const effectiveCoopSalary = inputs.coopSalaryOverride !== null ? inputs.coopSalaryOverride : program.avgCoopSalary;
    const effectiveTuition = inputs.annualTuitionOverride !== null ? inputs.annualTuitionOverride : program.annualTuition;
    const effectiveStartingSalary = getEffectiveStartingSalary(inputs, program);

    // Get career growth rate suggestion if career selected
    const careers = getCareerOptions(inputs.programId);
    const selectedCareer = careers.find((c) => c.id === inputs.careerId);
    const graduationYear = inputs.startYear + program.years;

    const costBreakdown = calculateNetDegreeCost(
      effectiveTuition,
      program.years,
      inputs.hasCoop && program.coopAvailable,
      inputs.coopTerms,
      effectiveCoopSalary,
      {
        hasResidence: inputs.hasResidence,
        annualResidenceCost: inputs.annualResidenceCost,
        hasMealPlan: inputs.hasMealPlan,
        annualMealPlanCost: inputs.annualMealPlanCost,
        annualBursary: inputs.annualBursary + (inputs.annualScholarship ?? 0),
      }
    );

    const loanPrincipal = costBreakdown.totalTuition * (inputs.loanPercent / 100);
    const loan = calculateLoanRepayment(loanPrincipal, inputs.loanInterestRate, 10);
    const annualLoanPayment = loan.monthlyPayment * 12;
    const costOfLiving = inputs.costOfLivingOverride !== null
      ? inputs.costOfLivingOverride
      : (programsData.costOfLiving[inputs.city]?.annualTotal ?? 42000);

    const withDegree = calculateNetWorthWithDegree(
      effectiveStartingSalary,
      inputs.salaryGrowthRate,
      inputs.investmentReturn,
      annualLoanPayment,
      costOfLiving,
      loanPrincipal,
      inputs.loanInterestRate
    );

    const withoutDegree = calculateNetWorthWithoutDegree(
      inputs.baselineSalary,
      inputs.salaryGrowthRate,
      inputs.investmentReturn,
      effectiveTuition,
      costOfLiving,
      program.years
    );

    const breakEvenYear = calculateBreakevenYear(withDegree, withoutDegree);

    const resultObj = {
      costBreakdown,
      withDegree,
      withoutDegree,
      breakEvenYear,
      startingSalary: effectiveStartingSalary,
      selectedCareer,
      graduationYear,
      insights: [],
    };

    resultObj.insights = generateInsights(resultObj, program, { ...inputs, graduationYear });
    return resultObj;
  }, [inputs]);

  return (
    <div className="flex-1 bg-neutral-50">
      {/* Page header */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-[11px] font-medium text-white/40 uppercase tracking-[0.25em] mb-2">Tool</p>
          <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight">ROI Calculator</h1>
          <p className="text-sm font-light text-white/50 mt-2 max-w-lg">
            Configure your scenario on the left — net cost, break-even year, and 10-year net worth update in real time.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 lg:sticky lg:top-20 lg:self-start">
            <InputPanel inputs={inputs} onChange={handleChange} />
          </div>
          <div>
            <OutputPanel results={results} inputs={inputs} />
          </div>
        </div>
      </div>
    </div>
  );
}
