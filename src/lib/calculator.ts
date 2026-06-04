export interface CalculatorInputs {
  basicSalary: number; // Average of last 60 months
  serviceYears: number;
  serviceMonths: number;
  isHigherPension: boolean;
  dateOfBirth?: string;
}

export interface WhatIfScenario {
  age: number;
  description: string;
  multiplier: number;
  estimatedAmount: number;
}

export interface CalculatorResults {
  roundedServiceYears: number;
  weightageAdded: boolean;
  pensionableService: number; // Max 35
  pensionableSalary: number; // Max 15000 if not higher pension
  monthlyPensionAge58: number;
  whatIfScenarios: WhatIfScenario[];
}

export function calculatePension(inputs: CalculatorInputs): CalculatorResults {
  const { basicSalary, serviceYears, serviceMonths, isHigherPension } = inputs;
  
  // Rule: If service >= 6 months, round up to next year. Otherwise, ignore months.
  const roundedServiceYears = serviceYears + (serviceMonths >= 6 ? 1 : 0);
  
  // Rule: If service >= 20 years, add 2 years weightage bonus
  const weightageAdded = roundedServiceYears >= 20;
  
  let pensionableService = roundedServiceYears;
  if (weightageAdded) {
    pensionableService += 2;
  }
  
  // Rule: Maximum pensionable service is 35 years
  pensionableService = Math.min(pensionableService, 35);
  
  // Rule: Wage ceiling is 15,000 unless "Higher Pension" is opted
  const pensionableSalary = isHigherPension ? basicSalary : Math.min(basicSalary, 15000);
  
  // Formula: (Pensionable Salary * Pensionable Service) / 70
  // Ensuring it doesn't drop below minimum pension of Rs 1000 (though actual rules have multiple slabs, simplified min here)
  let standardPension = (pensionableSalary * pensionableService) / 70;
  if (standardPension > 0) {
    standardPension = Math.max(standardPension, 1000);
  } else {
    standardPension = 0;
  }

  // Base calculation assumes retirement at age 58 for the standard amount
  const whatIfScenarios: WhatIfScenario[] = [
    { 
      age: 50, 
      description: "Early Retirement (-32%)", 
      multiplier: 0.68, 
      estimatedAmount: Math.max(standardPension * 0.68, 1000) 
    },
    { 
      age: 55, 
      description: "Early Retirement (-12%)", 
      multiplier: 0.88, 
      estimatedAmount: Math.max(standardPension * 0.88, 1000) 
    },
    { 
      age: 58, 
      description: "Standard Retirement", 
      multiplier: 1.0, 
      estimatedAmount: standardPension 
    },
    { 
      age: 60, 
      description: "Deferred Retirement (+8%)", 
      multiplier: 1.08, 
      estimatedAmount: standardPension * 1.08 
    },
  ];
  
  return {
    roundedServiceYears,
    weightageAdded,
    pensionableService,
    pensionableSalary,
    monthlyPensionAge58: standardPension,
    whatIfScenarios
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
