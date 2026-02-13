import { monthKeys } from "@/lib/calculators/constants";

export function monthlyRateFromAnnualPercent(annualPercent: number): number {
  return annualPercent / 100 / 12;
}

export function mortgagePayment(principal: number, annualRatePercent: number, amortizationYears: number): number {
  const monthlyRate = monthlyRateFromAnnualPercent(annualRatePercent);
  const periods = Math.max(1, amortizationYears * 12);

  if (monthlyRate === 0) {
    return principal / periods;
  }

  return (
    (principal * monthlyRate * (1 + monthlyRate) ** periods) /
    ((1 + monthlyRate) ** periods - 1)
  );
}

export function buildAmortizationSchedule(args: {
  principal: number;
  annualRatePercent: number;
  amortizationYears: number;
}) {
  const monthlyRate = monthlyRateFromAnnualPercent(args.annualRatePercent);
  const payment = mortgagePayment(args.principal, args.annualRatePercent, args.amortizationYears);
  const periods = args.amortizationYears * 12;

  let balance = args.principal;
  let totalInterest = 0;

  const yearly: Array<{ year: string; balance: number; interestPaid: number; principalPaid: number }> = [];
  let yearInterest = 0;
  let yearPrincipal = 0;

  for (let i = 1; i <= periods; i += 1) {
    const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const principalPaid = Math.min(balance, payment - interest);

    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;
    yearInterest += interest;
    yearPrincipal += principalPaid;

    if (i % 12 === 0 || i === periods) {
      yearly.push({
        year: `Year ${Math.ceil(i / 12)}`,
        balance,
        interestPaid: yearInterest,
        principalPaid: yearPrincipal
      });
      yearInterest = 0;
      yearPrincipal = 0;
    }
  }

  return {
    payment,
    totalInterest,
    totalPaid: payment * periods,
    yearly
  };
}

export function breakEvenUnits(fixedCosts: number, pricePerUnit: number, variableCostPerUnit: number): number {
  const contribution = pricePerUnit - variableCostPerUnit;
  if (contribution <= 0) {
    return Number.POSITIVE_INFINITY;
  }
  return fixedCosts / contribution;
}

export function gstRemittance(collectedSales: number, taxableExpenses: number, rate = 0.05) {
  const collected = collectedSales * rate;
  const itc = taxableExpenses * rate;
  return {
    collected,
    itc,
    remittance: collected - itc
  };
}

export type DebtInput = { name: string; balance: number; apr: number; minimumPayment: number };

export function debtPayoffSchedule(args: {
  debts: DebtInput[];
  monthlyBudget: number;
  method: "avalanche" | "snowball";
  maxMonths?: number;
}) {
  const maxMonths = args.maxMonths ?? 600;
  const debts = args.debts
    .filter((debt) => debt.balance > 0)
    .map((debt) => ({ ...debt }));

  const history: Array<{ month: string; totalBalance: number }> = [];
  let month = 0;

  while (month < maxMonths && debts.some((debt) => debt.balance > 0)) {
    month += 1;

    debts.forEach((debt) => {
      if (debt.balance <= 0) {
        return;
      }
      debt.balance += debt.balance * (debt.apr / 100 / 12);
    });

    const activeDebts = debts.filter((debt) => debt.balance > 0);
    const minimumTotal = activeDebts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
    let remainingBudget = Math.max(0, args.monthlyBudget - minimumTotal);

    activeDebts.forEach((debt) => {
      const paid = Math.min(debt.balance, debt.minimumPayment);
      debt.balance -= paid;
    });

    const target = [...activeDebts]
      .filter((debt) => debt.balance > 0)
      .sort((a, b) => {
        if (args.method === "avalanche") {
          return b.apr - a.apr;
        }
        return a.balance - b.balance;
      })[0];

    if (target && remainingBudget > 0) {
      const extra = Math.min(target.balance, remainingBudget);
      target.balance -= extra;
      remainingBudget -= extra;
    }

    const totalBalance = debts.reduce((sum, debt) => sum + Math.max(0, debt.balance), 0);
    history.push({ month: `M${month}`, totalBalance });

    if (remainingBudget > 0) {
      for (const debt of debts.filter((item) => item.balance > 0)) {
        if (remainingBudget <= 0) {
          break;
        }
        const extra = Math.min(debt.balance, remainingBudget);
        debt.balance -= extra;
        remainingBudget -= extra;
      }
    }
  }

  return {
    monthsToDebtFree: month,
    history
  };
}

export function futureValueProjection(args: {
  initial: number;
  monthlyContribution: number;
  annualReturnPercent: number;
  years: number;
}) {
  const monthlyRate = args.annualReturnPercent / 100 / 12;
  const months = args.years * 12;
  let balance = args.initial;

  const byYear: Array<{ year: string; balance: number }> = [];

  for (let m = 1; m <= months; m += 1) {
    balance = balance * (1 + monthlyRate) + args.monthlyContribution;

    if (m % 12 === 0 || m === months) {
      byYear.push({
        year: `Y${Math.ceil(m / 12)}`,
        balance
      });
    }
  }

  return {
    finalBalance: balance,
    byYear
  };
}

export function monthGridTotals(grid: Record<string, number>) {
  return monthKeys.reduce(
    (acc, key) => {
      const value = Number(grid[key] ?? 0);
      acc.monthly.push(value);
      acc.total += value;
      return acc;
    },
    { monthly: [] as number[], total: 0 }
  );
}

export function annualizeMonthlyValue(value: number) {
  return value * 12;
}
