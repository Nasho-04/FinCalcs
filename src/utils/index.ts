import type { IPath, IResults, ScenarioData } from "../types/index";


/* Local Storage Functions */

export function readLocalStorage(): string {
    const scenarios = localStorage.getItem('scenarios')
    if (scenarios) {
        return scenarios
    } else {
        localStorage.setItem('scenarios', '[]')
        return '[]'
    }
}

export function saveToLocalStorage(newScenario: IResults): void {
    const scenarios = JSON.parse(readLocalStorage())
    scenarios.push(newScenario)
    localStorage.setItem('scenarios', JSON.stringify(scenarios))
}

export function deleteFromLocalStorage(index: number): void {
    const scenarios = JSON.parse(readLocalStorage())
    scenarios.splice(index, 1)
    localStorage.setItem('scenarios', JSON.stringify(scenarios))
}

/* Calculator Functions */

/* SAVINGS CALCULATOR */

/**
 * Calculates the year-by-year growth of an investment using monthly compounding
 * and monthly contributions for three market scenarios.
 * * @param initialInvestment The starting principal amount (P).
 * @param monthlyContribution The fixed amount contributed each month (C_monthly).
 * @param years The total investment period (n).
 * @param expectedRate The client's base expected rate (r_exp, e.g., 0.10 for 10%).
 * @returns An array of data points for plotting the three scenarios.
 */
export function calculateSavings(
    initialInvestment: number,
    monthlyContribution: number,
    timePeriod: number,
    expectedRate: number
): ScenarioData[] {

    // 1. Define the Scenario Rates (Annual and Monthly)
    const annualRates = {
        pessimistic: Math.max(0, expectedRate / 100 - 0.03),
        expected: expectedRate / 100,
        optimistic: expectedRate / 100 + 0.03
    };

    // Convert annual rates to monthly rates
    const monthlyRates = {
        pessimistic: annualRates.pessimistic / 12,
        expected: annualRates.expected / 12,
        optimistic: annualRates.optimistic / 12
    };

    // 2. Initialize tracking arrays and balances
    const results: ScenarioData[] = [];
    let balancePessimistic: number = initialInvestment;
    let balanceExpected: number = initialInvestment;
    let balanceOptimistic: number = initialInvestment;
    let totalContribution: number = initialInvestment;


    // Add the starting point
    results.push({ year: 0, pessimistic: balancePessimistic, expected: balanceExpected, optimistic: balanceOptimistic, totalContribution: totalContribution });

    const totalMonths: number = timePeriod * 12;


    // 3. Loop through each month
    for (let m = 1; m <= totalMonths; m++) {

        // --- Apply Monthly Contribution and Growth ---
        // Pessimistic
        balancePessimistic = (balancePessimistic + monthlyContribution) * (1 + monthlyRates.pessimistic);

        // Expected
        balanceExpected = (balanceExpected + monthlyContribution) * (1 + monthlyRates.expected);

        // Optimistic
        balanceOptimistic = (balanceOptimistic + monthlyContribution) * (1 + monthlyRates.optimistic);

        // 4. Store Annual Results (only at the end of every 12th month)
        if (m % 12 === 0) {
            const currentYear = m / 12;
            const totalContribution = initialInvestment + (currentYear * 12 * monthlyContribution);
            results.push({
                year: currentYear,
                pessimistic: parseFloat(balancePessimistic.toFixed(2)),
                expected: parseFloat(balanceExpected.toFixed(2)),
                optimistic: parseFloat(balanceOptimistic.toFixed(2)),
                totalContribution: parseFloat(totalContribution.toFixed(2))
            });
        }
    }

    return results;
}

/* TIME PERIOD CALCULATOR */

export function calculateInvestmentPaths(
    objectiveAmount: number,
    initialInvestment: number,
    monthlyContribution: number,
    expectedRate: number
): ScenarioData[] {

    // Define 100 years as the max simulation period
    const MAX_MONTHS = 1200;

    // Define scenario rates
    const annualRates = {
        pessimistic: Math.max(0, expectedRate / 100 - 0.03), // -3% adjustment
        expected: expectedRate / 100,
        optimistic: expectedRate / 100 + 0.03 // +3% adjustment
    };

    const monthlyRates = {
        pessimistic: annualRates.pessimistic / 12,
        expected: annualRates.expected / 12,
        optimistic: annualRates.optimistic / 12
    };

    const results: ScenarioData[] = [];
    let balancePessimistic = initialInvestment;
    let balanceExpected = initialInvestment;
    let balanceOptimistic = initialInvestment;
    let months = 0;

    // Flags to track when each scenario has hit the objectiveAmount
    let pessimisticHitobjectiveAmount = initialInvestment >= objectiveAmount;
    let expectedHitobjectiveAmount = initialInvestment >= objectiveAmount;
    let optimisticHitobjectiveAmount = initialInvestment >= objectiveAmount;

    // Check for immediate unreachability (no growth and no contributions)
    if (monthlyContribution <= 0 && expectedRate <= 0 && objectiveAmount > initialInvestment) {
        const startPoint: ScenarioData[] = [{ year: 0, pessimistic: initialInvestment, expected: initialInvestment, optimistic: initialInvestment, totalContribution: initialInvestment }];
        return startPoint;
    }

    // Add the starting point (Year 0)
    results.push({
        year: 0,
        pessimistic: initialInvestment >= objectiveAmount ? objectiveAmount : initialInvestment,
        expected: initialInvestment >= objectiveAmount ? objectiveAmount : initialInvestment,
        optimistic: initialInvestment >= objectiveAmount ? objectiveAmount : initialInvestment,
        totalContribution: initialInvestment
    });


    // --- Iterative Simulation runs for the full 100 years (MAX_MONTHS) ---
    while (months < MAX_MONTHS && !(pessimisticHitobjectiveAmount && expectedHitobjectiveAmount && optimisticHitobjectiveAmount)) {
        months++;

        // 1. Calculate growth for all three scenarios (balances continue to grow internally)
        balancePessimistic = (balancePessimistic + monthlyContribution) * (1 + monthlyRates.pessimistic);
        balanceExpected = (balanceExpected + monthlyContribution) * (1 + monthlyRates.expected);
        balanceOptimistic = (balanceOptimistic + monthlyContribution) * (1 + monthlyRates.optimistic);

        // 2. Track the moment each objectiveAmount is reached and update flags
        if (!optimisticHitobjectiveAmount && balanceOptimistic >= objectiveAmount) {
            optimisticHitobjectiveAmount = true;
        }
        if (!expectedHitobjectiveAmount && balanceExpected >= objectiveAmount) {
            expectedHitobjectiveAmount = true;
        }
        if (!pessimisticHitobjectiveAmount && balancePessimistic >= objectiveAmount) {
            pessimisticHitobjectiveAmount = true;
        }
        // 3. Store data annually (only at the end of every 12th month)
        if (months % 12 === 0 || months === MAX_MONTHS || (pessimisticHitobjectiveAmount && expectedHitobjectiveAmount && optimisticHitobjectiveAmount)) {

            if (months % 12 !== 0 && (pessimisticHitobjectiveAmount && expectedHitobjectiveAmount && optimisticHitobjectiveAmount)) {
                // Adjust the current year calculation for non-annual stops
                const currentYear = months / 12;
                const totalContribution = initialInvestment + (months * monthlyContribution);

                results.push({
                    year: parseFloat(currentYear.toFixed(2)),
                    // Cap the balance at the objectiveAmount for display
                    pessimistic: pessimisticHitobjectiveAmount ? objectiveAmount : parseFloat(balancePessimistic.toFixed(0)),
                    expected: expectedHitobjectiveAmount ? objectiveAmount : parseFloat(balanceExpected.toFixed(0)),
                    optimistic: optimisticHitobjectiveAmount ? objectiveAmount : parseFloat(balanceOptimistic.toFixed(0)),
                    totalContribution: parseFloat(totalContribution.toFixed(0)),
                });
                break; // Break the while loop if all objectiveAmounts are hit
            }

            // Annual snapshot (or Max Months hit)
            if (months % 12 === 0 || months === MAX_MONTHS) {
                const currentYear = months / 12;
                const totalContribution = initialInvestment + (months * monthlyContribution);

                results.push({
                    year: parseFloat(currentYear.toFixed(1)),
                    // Cap the balance at the objectiveAmount for display
                    pessimistic: pessimisticHitobjectiveAmount ? objectiveAmount : parseFloat(balancePessimistic.toFixed(0)),
                    expected: expectedHitobjectiveAmount ? objectiveAmount : parseFloat(balanceExpected.toFixed(0)),
                    optimistic: optimisticHitobjectiveAmount ? objectiveAmount : parseFloat(balanceOptimistic.toFixed(0)),
                    totalContribution: parseFloat(totalContribution.toFixed(0)),
                });
            }
        }
    }
    return results;
}

/* CONTRIBUTION CALCULATOR */

/**
 * Calculates the required monthly contribution needed to reach a specific financial goal 
 * over a set period, factoring in initial investment and expected rate.
 * * It calculates the required payment (PMT) using the Future Value (FV) formula, 
 * then adjusts for the Future Value of the Initial Investment (FV_PV).
 * * @param inputs - The investment parameters (goal, time, initial investment, rate).
 * @returns The required monthly contribution for pessimistic, expected, and optimistic scenarios.
 */
export function calculateMonthlyContribution(
    objectiveAmount: number,
    timePeriod: number,
    initialInvestment: number,
    expectedRate: number
): { expectedContribution: number, path: IPath[] } {

    const MAX_MONTHS = timePeriod * 12;
    const expectedRateDecimal = expectedRate / 100;

    // --- 1. Calculate Required PMT (Monthly Contribution) ---
    const calculatePMT = (annualRate: number): number => {
        const monthlyRate = annualRate / 12;

        // Calculate Future Value of the Initial Investment (FV_PV)
        const FV_PV = initialInvestment * Math.pow(1 + monthlyRate, MAX_MONTHS);

        // Determine the remaining amount needed from contributions
        const goalNeeded = objectiveAmount - FV_PV;

        // If goal is already met or exceeded by initial investment alone, PMT is 0
        if (goalNeeded <= 0) {
            return 0;
        }

        // Calculate required PMT using the Future Value Annuity formula
        if (monthlyRate === 0) {
            // Handle 0% rate case
            return goalNeeded / MAX_MONTHS;
        } else {
            // PMT = Goal_Needed / [((1 + monthlyRate)^MONTHS - 1) / monthlyRate]
            const futureValueAnnuityFactor = (Math.pow(1 + monthlyRate, MAX_MONTHS) - 1) / monthlyRate;
            return goalNeeded / futureValueAnnuityFactor;
        }
    };

    const expectedContribution = Math.max(0, calculatePMT(expectedRateDecimal));

    // --- 2. Generate the Graph Path using the Calculated Required Contribution ---
    const monthlyRate = expectedRateDecimal / 12;
    const results = [];
    let balance = initialInvestment;
    let months = 0;

    // Add the starting point (Year 0)
    results.push({
        year: 0,
        balance: initialInvestment,
        totalContribution: initialInvestment
    });

    // The simulation runs exactly for the specified time period (MAX_MONTHS)
    while (months < MAX_MONTHS) {
        months++;

        // Apply Monthly Contribution and Growth
        balance = (balance + expectedContribution) * (1 + monthlyRate);

        // Store Annual Results (only at the end of every 12th month)
        if (months % 12 === 0 || months === MAX_MONTHS) {
            const currentYear = months / 12;
            const totalContribution = initialInvestment + (months * expectedContribution);

            // Add point, capping the balance at the goal amount
            results.push({
                year: parseFloat(currentYear.toFixed(1)),
                balance: Math.min(objectiveAmount, parseFloat(balance.toFixed(0))),
                totalContribution: parseFloat(totalContribution.toFixed(0)),
            });
        }
    }

    // Ensure the final point's balance meets the goal due to rounding in the PMT formula
    if (results.length > 0) {
        results[results.length - 1].balance = Math.max(results[results.length - 1].balance, objectiveAmount);
    }

    return {
        expectedContribution: Number(expectedContribution.toFixed(2)),
        path: results,
    };
}