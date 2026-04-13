/**
 * TrueCost AI Financial Engine
 * Implements the radical transparency logic described in the PRD.
 */

export const calculateEMI = (principal, annualRate, tenureYears) => {
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return emi;
};

export const calculateTotalRepayment = (emi, tenureYears) => {
  return emi * tenureYears * 12;
};

export const calculateInflationAdjustedCost = (totalRepayment, tenureYears, inflationRate = 6) => {
  // Simple NPV approach for the total repayment over time
  // This is an approximation of the "Real Terms" cost
  const r = inflationRate / 100;
  return totalRepayment / Math.pow(1 + r, tenureYears);
};

export const calculateOpportunityCost = (monthlyPayment, tenureYears, marketReturn = 12) => {
  // FV of a monthly investment (SIP)
  const r = marketReturn / 12 / 100;
  const n = tenureYears * 12;
  const fv = monthlyPayment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return fv;
};

export const calculateTaxSavings80E = (totalInterest, marginalTaxRate = 20) => {
  // Sec 80E allows deduction of FULL interest for up to 8 years
  // For simplicity in MVP, we take the interest and apply the marginal tax rate
  return totalInterest * (marginalTaxRate / 100);
};

export const calculateStressIndex = (emi, predictedSalary) => {
  if (!predictedSalary) return 0;
  const monthlySalary = predictedSalary / 12;
  const ratio = emi / monthlySalary;
  
  // 0-30: Safe, 30-50: Warning, 50+: Danger
  let score = ratio * 100;
  return Math.min(Math.max(score, 0), 100);
};

export const getNetTrueCost = (totalRepayment, taxSavings, subsidies = 0) => {
  return totalRepayment - taxSavings - subsidies;
};
