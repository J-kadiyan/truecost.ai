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

/**
 * Prepayment Savings Calculator
 * Calculates how much interest and time you save with extra monthly payments.
 */
export const calculatePrepaymentSavings = (principal, annualRate, tenureYears, extraMonthly) => {
  if (extraMonthly <= 0) {
    return { newTenureMonths: tenureYears * 12, interestSaved: 0, timeSavedMonths: 0, newTotalInterest: 0, originalTotalInterest: 0 };
  }

  const r = annualRate / 12 / 100;
  const originalN = tenureYears * 12;
  const emi = (principal * r * Math.pow(1 + r, originalN)) / (Math.pow(1 + r, originalN) - 1);

  // Calculate original total interest
  const originalTotalInterest = (emi * originalN) - principal;

  // Simulate month-by-month with extra payment
  let balance = principal;
  let months = 0;
  let totalInterestPaid = 0;

  while (balance > 0 && months < originalN) {
    months++;
    const interestPart = balance * r;
    const principalPart = emi - interestPart + extraMonthly;
    totalInterestPaid += interestPart;

    balance -= principalPart;
    if (balance < 0) balance = 0;
  }

  return {
    newTenureMonths: months,
    interestSaved: originalTotalInterest - totalInterestPaid,
    timeSavedMonths: originalN - months,
    newTotalInterest: totalInterestPaid,
    originalTotalInterest,
  };
};

/**
 * Amortization schedule builder (year-by-year)
 */
export const buildAmortizationSchedule = (principal, annualRate, tenureYears) => {
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  let balance = principal;
  const schedule = [];

  for (let year = 1; year <= tenureYears; year++) {
    let yearInterest = 0;
    let yearPrincipal = 0;
    for (let month = 1; month <= 12; month++) {
      const interestPart = balance * r;
      const principalPart = emi - interestPart;
      yearInterest += interestPart;
      yearPrincipal += principalPart;
      balance -= principalPart;
    }
    if (balance < 0) balance = 0;
    schedule.push({
      year,
      annualPayment: emi * 12,
      principalPaid: yearPrincipal,
      interestPaid: yearInterest,
      remainingBalance: balance,
      principalPercent: (yearPrincipal / (emi * 12)) * 100,
    });
  }

  return schedule;
};

/**
 * Smart Verdict Engine
 * Returns an algorithmic recommendation based on financial analysis.
 */
export const generateVerdict = ({ stressIndex, emiToIncomePercent, opportunityCost, totalInterest, loanAmount, tenure }) => {
  let score = 0;
  const factors = [];
  const recommendations = [];

  // Factor 1: Stress Index (weight: 35%)
  if (stressIndex < 25) {
    score += 35;
    factors.push({ label: 'Stress Index', status: 'good', detail: 'EMI is comfortably within income capacity' });
  } else if (stressIndex < 50) {
    score += 20;
    factors.push({ label: 'Stress Index', status: 'warning', detail: 'EMI will consume a significant portion of income' });
    recommendations.push('Build an emergency fund of at least 6 months EMI before loan disbursal');
  } else {
    score += 5;
    factors.push({ label: 'Stress Index', status: 'danger', detail: 'EMI exceeds safe income allocation thresholds' });
    recommendations.push('Explore scholarship options or part-time work to reduce loan dependency');
    recommendations.push('Consider co-borrowing with a parent to negotiate better interest rates');
  }

  // Factor 2: Interest-to-Principal Ratio (weight: 25%)
  const interestRatio = totalInterest / loanAmount;
  if (interestRatio < 0.3) {
    score += 25;
    factors.push({ label: 'Interest Burden', status: 'good', detail: `You pay only ${(interestRatio * 100).toFixed(0)}% extra as interest` });
  } else if (interestRatio < 0.7) {
    score += 15;
    factors.push({ label: 'Interest Burden', status: 'warning', detail: `Interest adds ${(interestRatio * 100).toFixed(0)}% to your principal` });
    recommendations.push('Consider making small prepayments annually to reduce total interest');
  } else {
    score += 5;
    factors.push({ label: 'Interest Burden', status: 'danger', detail: `You\'re paying ${(interestRatio * 100).toFixed(0)}% of principal as pure interest` });
    recommendations.push('Negotiate a lower interest rate or reduce loan tenure if possible');
  }

  // Factor 3: Tenure appropriateness (weight: 20%)
  if (tenure <= 5) {
    score += 20;
    factors.push({ label: 'Loan Tenure', status: 'good', detail: 'Short tenure minimizes long-term cost' });
  } else if (tenure <= 10) {
    score += 12;
    factors.push({ label: 'Loan Tenure', status: 'warning', detail: 'Medium tenure — balance between EMI burden and total cost' });
    recommendations.push('If income grows, increase EMI payments to close the loan early');
  } else {
    score += 5;
    factors.push({ label: 'Loan Tenure', status: 'danger', detail: 'Long tenure significantly inflates total cost' });
    recommendations.push('A tenure above 10 years is rarely optimal — try to reduce it below 8 years');
  }

  // Factor 4: ROI potential (weight: 20%)
  const roiScore = emiToIncomePercent < 30 ? 20 : emiToIncomePercent < 50 ? 12 : 4;
  score += roiScore;
  if (roiScore >= 20) {
    factors.push({ label: 'Return on Education', status: 'good', detail: 'Expected salary comfortably covers loan obligations' });
  } else if (roiScore >= 12) {
    factors.push({ label: 'Return on Education', status: 'warning', detail: 'Salary covers loan but leaves limited disposable income' });
    recommendations.push('Prioritize skill development and networking to maximize salary growth in early career');
  } else {
    factors.push({ label: 'Return on Education', status: 'danger', detail: 'Expected salary may not justify the loan amount' });
    recommendations.push('Research placement statistics carefully — consider alternative institutions with better ROI');
  }

  // Determine verdict
  let verdict, verdictColor, verdictDescription;
  if (score >= 70) {
    verdict = 'PROCEED';
    verdictColor = 'safe';
    verdictDescription = 'This education investment shows strong financial viability. The loan is well-structured relative to expected outcomes.';
  } else if (score >= 45) {
    verdict = 'PROCEED WITH CAUTION';
    verdictColor = 'warning';
    verdictDescription = 'The loan is serviceable but carries moderate risk. Follow the recommendations below to improve your financial position.';
  } else {
    verdict = 'RECONSIDER';
    verdictColor = 'danger';
    verdictDescription = 'This loan structure poses significant financial risk. Strongly consider the alternatives and recommendations below.';
  }

  return {
    score,
    verdict,
    verdictColor,
    verdictDescription,
    factors,
    recommendations: recommendations.slice(0, 4), // max 4 recommendations
  };
};
