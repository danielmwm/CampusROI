export function calculateNetDegreeCost(annualTuition, years, hasCoop, coopTerms, avgCoopSalary, options = {}) {
  const {
    hasResidence = false,
    annualResidenceCost = 13200,
    hasMealPlan = false,
    annualMealPlanCost = 6200,
    annualBursary = 2500,
  } = options;

  const totalTuition = annualTuition * years;
  const totalResidence = hasResidence ? annualResidenceCost * years : 0;
  const totalMealPlan = hasMealPlan ? annualMealPlanCost * years : 0;
  const grossCost = totalTuition + totalResidence + totalMealPlan;
  const coopEarnings = hasCoop ? coopTerms * avgCoopSalary * 0.72 : 0;
  const bursaryTotal = annualBursary * years;
  const netCost = grossCost - coopEarnings - bursaryTotal;

  return {
    totalTuition,
    totalResidence,
    totalMealPlan,
    grossCost,
    coopEarnings,
    bursaryTotal,
    netCost: Math.max(netCost, 0),
  };
}

export function calculateLoanRepayment(principal, annualInterestRate, repaymentYears = 10) {
  if (principal <= 0) return { monthlyPayment: 0, totalPaid: 0, totalInterest: 0 };
  const monthlyRate = annualInterestRate / 100 / 12;
  const n = repaymentYears * 12;
  if (monthlyRate === 0) {
    const monthly = principal / n;
    return { monthlyPayment: monthly, totalPaid: principal, totalInterest: 0 };
  }
  const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  return {
    monthlyPayment: monthly,
    totalPaid: monthly * n,
    totalInterest: monthly * n - principal,
  };
}

// Tracks investment portfolio and outstanding loan balance separately so
// net worth at year 0 correctly reflects loan debt (not zero).
export function calculateNetWorthWithDegree(
  startingSalary,
  salaryGrowthRate,
  investmentReturn,
  annualLoanPayment,
  costOfLiving,
  loanPrincipal = 0,
  loanInterestRate = 6.5,
  years = 11
) {
  let portfolio = 0;
  let loanBalance = loanPrincipal;
  let salary = startingSalary;
  const growthDecimal = salaryGrowthRate / 100;
  const returnDecimal = investmentReturn / 100;
  const loanRate = loanInterestRate / 100;
  const data = [];

  for (let yr = 0; yr <= years; yr++) {
    // Net worth = investments accumulated minus remaining loan debt
    data.push({ year: yr, netWorth: Math.round(portfolio - loanBalance) });

    if (yr < years) {
      // Accrue loan interest then apply annual payment (standard amortization)
      if (loanBalance > 0) {
        loanBalance = Math.max(loanBalance * (1 + loanRate) - annualLoanPayment, 0);
      }
      const actualPayment = loanPrincipal > 0 ? annualLoanPayment : 0;
      const disposable = salary - costOfLiving - actualPayment;
      portfolio = portfolio * (1 + returnDecimal) + Math.max(disposable * 0.2, 0);
      salary *= 1 + growthDecimal;
    }
  }
  return data;
}

// Pre-calculates the savings the no-degree person accumulated DURING the
// degree years so that year-0 on the chart correctly shows their head start.
export function calculateNetWorthWithoutDegree(
  baselineSalary,
  salaryGrowthRate,
  investmentReturn,
  tuitionSavedAnnual,
  costOfLiving,
  degreeYears,
  years = 11
) {
  const growthDecimal = salaryGrowthRate / 100;
  const returnDecimal = investmentReturn / 100;

  // Accumulate wealth during school years (these already happened by graduation)
  let preGradWealth = 0;
  for (let sy = 1; sy <= degreeYears; sy++) {
    const income = baselineSalary * Math.pow(1 + growthDecimal, sy - 1);
    const disposable = income - costOfLiving + tuitionSavedAnnual;
    preGradWealth = preGradWealth * (1 + returnDecimal) + Math.max(disposable * 0.3, 0);
  }

  // No-degree salary has grown by degreeYears at graduation
  let salary = baselineSalary * Math.pow(1 + growthDecimal, degreeYears);
  let netWorth = preGradWealth;
  const data = [];

  for (let yr = 0; yr <= years; yr++) {
    data.push({ year: yr, netWorth: Math.round(netWorth) });
    if (yr < years) {
      const disposable = salary - costOfLiving;
      netWorth = netWorth * (1 + returnDecimal) + Math.max(disposable * 0.2, 0);
      salary *= 1 + growthDecimal;
    }
  }
  return data;
}

export function calculateBreakevenYear(withDegreeArray, withoutDegreeArray) {
  for (let i = 0; i < withDegreeArray.length; i++) {
    if (withDegreeArray[i].netWorth >= withoutDegreeArray[i].netWorth) {
      return withDegreeArray[i].year;
    }
  }
  return null;
}

export function generateInsights(results, programData, inputs) {
  const insights = [];
  const { netCost, coopEarnings, grossCost } = results.costBreakdown;
  const { breakEvenYear, withDegree, startingSalary } = results;

  if (coopEarnings > 0 && grossCost > 0) {
    const offsetPct = Math.round((coopEarnings / grossCost) * 100);
    insights.push(
      `Co-op earnings offset ${offsetPct}% of total degree costs — reducing your net investment to ${formatCurrency(netCost)}.`
    );
  }

  if (breakEvenYear !== null) {
    const graduationYear = inputs.graduationYear ?? (inputs.startYear + parseInt(programData.years));
    const breakevenCalYear = graduationYear + breakEvenYear;
    insights.push(
      `You break even on your degree in ${breakevenCalYear} — ${breakEvenYear === 1 ? '1 year' : `${breakEvenYear} years`} after graduating.`
    );
  } else {
    insights.push("At these inputs the degree doesn't break even within 10 years post-graduation. Consider co-op, a higher-earning city, or a lower-cost program.");
  }

  if (startingSalary > 0) {
    const canadianAvg = 58000;
    const pctAbove = Math.round(((startingSalary - canadianAvg) / canadianAvg) * 100);
    if (pctAbove > 0) {
      insights.push(
        `${programData.name} starting salaries run ~${pctAbove}% above the national average of ${formatCurrency(canadianAvg)}.`
      );
    }
  }

  const tenYearNetWorth = withDegree[withDegree.length - 1]?.netWorth ?? 0;
  if (tenYearNetWorth > 0) {
    insights.push(
      `Projected 10-year net worth: ${formatCurrency(tenYearNetWorth)} — assuming ${inputs.salaryGrowthRate}% salary growth and ${inputs.investmentReturn}% return.`
    );
  }

  return insights;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(amount);
}
