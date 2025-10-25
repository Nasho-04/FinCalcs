/* Interfaces for the calculators */

export interface IForms {
    timePeriod: number,
    expectedRate: number,
    monthlyContribution: number,
    initialInvestment: number,
    objectiveAmount: number
}

export type ISavingsForm = Pick<IForms, 'initialInvestment' | 'timePeriod' | 'monthlyContribution' | 'expectedRate'>

export type IPeriodForm = Pick<IForms, 'initialInvestment' | 'monthlyContribution' | 'expectedRate' | 'objectiveAmount'>

export type IContributionForm = Pick<IForms, 'timePeriod' | 'expectedRate' | 'objectiveAmount' | 'initialInvestment'>

export interface ScenarioData {
    year: number,
    pessimistic: number,
    expected: number,
    optimistic: number,
    totalContribution: number
}

export interface IResults {
    results: ScenarioData[],
    inputs: Partial<IForms>
}

export interface IPath {
    year: number,
    balance: number,
    totalContribution: number
}