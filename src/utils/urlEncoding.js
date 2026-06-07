export function encodeScenarioToUrl(inputs) {
  const params = new URLSearchParams();
  Object.entries(inputs).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  });
  return `${window.location.origin}/calculator?${params.toString()}`;
}

export function decodeScenarioFromUrl(search) {
  const params = new URLSearchParams(search);
  const inputs = {};
  for (const [key, value] of params.entries()) {
    // Coerce numeric fields
    const numericKeys = ['salaryGrowthRate', 'investmentReturn', 'loanInterestRate', 'loanPercent', 'coopTerms', 'graduationYear'];
    if (numericKeys.includes(key)) {
      inputs[key] = parseFloat(value);
    } else if (key === 'hasCoop') {
      inputs[key] = value === 'true';
    } else {
      inputs[key] = value;
    }
  }
  return inputs;
}

export function encodeCompareToUrl(sharedInputs, scenarios) {
  const params = new URLSearchParams();
  Object.entries(sharedInputs).forEach(([key, value]) => {
    params.set(`shared_${key}`, String(value));
  });
  scenarios.forEach((scenario, index) => {
    Object.entries(scenario).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.set(`s${index}_${key}`, String(value));
      }
    });
  });
  return `${window.location.origin}/compare?${params.toString()}`;
}

export function decodeCompareFromUrl(search) {
  const params = new URLSearchParams(search);
  const sharedInputs = {};
  const scenarios = [{}, {}, {}];

  for (const [key, value] of params.entries()) {
    if (key.startsWith('shared_')) {
      sharedInputs[key.replace('shared_', '')] = value;
    } else if (key.match(/^s[012]_/)) {
      const idx = parseInt(key[1]);
      const fieldKey = key.slice(3);
      scenarios[idx][fieldKey] = value;
    }
  }
  return { sharedInputs, scenarios };
}
