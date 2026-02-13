import { describe, expect, it } from "vitest";
import {
  breakEvenUnits,
  buildAmortizationSchedule,
  gstRemittance,
  mortgagePayment
} from "@/lib/calculators/math";

describe("core calculator math", () => {
  it("computes mortgage payment and amortization schedule", () => {
    const payment = mortgagePayment(500000, 5, 25);
    const schedule = buildAmortizationSchedule({ principal: 500000, annualRatePercent: 5, amortizationYears: 25 });

    expect(payment).toBeGreaterThan(0);
    expect(schedule.yearly.length).toBe(25);
    expect(schedule.yearly[24].balance).toBeLessThan(1);
  });

  it("computes break-even units", () => {
    const units = breakEvenUnits(20000, 100, 40);
    expect(Math.round(units)).toBe(333);
  });

  it("computes GST/HST remittance", () => {
    const result = gstRemittance(100000, 40000, 0.05);
    expect(result.collected).toBe(5000);
    expect(result.itc).toBe(2000);
    expect(result.remittance).toBe(3000);
  });
});
