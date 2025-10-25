import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import type { IContributionForm } from '../../types'
import '../../index.css'
import { useState } from 'react'
import { toast } from 'sonner'
import Note from '../Note/Note'
import { calculateMonthlyContribution } from '../../utils'
import ContributionResults from '../ContributionResults/Contributionresults'

const ContributionCalc = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<IContributionForm>()
    const onSubmit: SubmitHandler<IContributionForm> = (data) => {
        const { objectiveAmount, expectedRate, timePeriod, initialInvestment } = data
        setFormInputs(data)
        setResults(calculateMonthlyContribution(objectiveAmount, timePeriod, initialInvestment, expectedRate))
        toast.success('Sccenario created successfully!')
    }

    const [results, setResults] = useState(
        {
            expectedContribution: 0,
            path: [{
                year: 0,
                balance: 0,
                totalContribution: 0
            }]
        }
    )

    const [formInputs, setFormInputs] = useState({
        initialInvestment: 0,
        objectiveAmount: 0,
        timePeriod: 0,
        expectedRate: 0,
    })

    const reset = (): void => {
        setFormInputs({ initialInvestment: 0, objectiveAmount: 0, timePeriod: 0, expectedRate: 0 })
        setResults({
            expectedContribution: 0,
            path: [{
                year: 0,
                balance: 0,
                totalContribution: 0
            }]
        })
    }


    return (
        <>
            <div className='calculator-container'>
                {results.path[1]
                    ?
                    <div className='inputs-data-container'>
                        <h3 className='contribution-title'>Expected Contribution: ${results.expectedContribution.toLocaleString()}</h3>
                        <ul className='inputs-data-list'>
                            {formInputs.timePeriod && <li>Time Period: {formInputs.timePeriod} years</li>}
                            {(formInputs.initialInvestment || formInputs.initialInvestment === 0) && <li>Initial Investment: ${formInputs.initialInvestment}</li>}
                            {formInputs.expectedRate && <li>Expected Rate: {formInputs.expectedRate}%</li>}
                            {formInputs.objectiveAmount && <li>Objective Amount: ${formInputs.objectiveAmount}</li>}
                        </ul>
                        <div onClick={() => reset()} className='inputs-data-button'>Restart</div>
                    </div>
                    : <form onSubmit={handleSubmit(onSubmit)} className='form'>
                        <h3 className='calculator-title'>Contribution Calculator</h3>
                        <fieldset className='fieldset'>
                            <div className='input-container'>
                                <label htmlFor="initialInvestment">Initial Investment:</label>
                                <input
                                    type="number"
                                    id='initialInvestment'
                                    placeholder='0'
                                    {...register('initialInvestment', {
                                        required: "Initial investment is required",
                                        min: { value: 0, message: "Must be 0 or greater" },
                                        valueAsNumber: true
                                    })
                                    }
                                />
                            </div>
                            {errors.initialInvestment && <p className='form-error'>{errors.initialInvestment.message}</p>}
                        </fieldset>
                        <fieldset className='fieldset'>
                            <div className='input-container'>
                                <label htmlFor="objectiveAmount">Objective Amount:</label>
                                <input
                                    type="number"
                                    id='objectiveAmount'
                                    placeholder='1000'
                                    {...register('objectiveAmount', {
                                        required: "Objective Amount is required",
                                        min: { value: 1000, message: "Must be 1000 or greater" },
                                        valueAsNumber: true
                                    })
                                    }
                                />
                            </div>
                            {errors.objectiveAmount && <p className='form-error'>{errors.objectiveAmount.message}</p>}
                        </fieldset>
                        <fieldset className='fieldset'>
                            <div className='input-container'>
                                <label htmlFor="timePeriod">Time Period (Years):</label>
                                <input
                                    type="number"
                                    id='timePeriod'
                                    placeholder='1'
                                    {...register('timePeriod', {
                                        required: "Time Period is required",
                                        min: { value: 1, message: "Must be 1 or greater" },
                                        valueAsNumber: true
                                    })
                                    }
                                />
                            </div>
                            {errors.timePeriod && <p className='form-error'>{errors.timePeriod.message}</p>}
                        </fieldset>
                        <fieldset className='fieldset'>
                            <div className='input-container'>
                                <label htmlFor="expectedRate">Expected Rate(%):</label>
                                <input

                                    type="number"
                                    id='expectedRate'
                                    placeholder='10'
                                    {...register('expectedRate', {
                                        required: "Expected Rate is required",
                                        min: { value: 0.1, message: "Must be greater than 0" },
                                        valueAsNumber: true
                                    })}
                                />
                            </div>
                            {errors.expectedRate && <p className='form-error'>{errors.expectedRate.message}</p>}
                        </fieldset>

                        <button className='submit-btn' type='submit'>Calculate</button>
                    </form >
                }
            </div>

            <ContributionResults data={results} />
            {results.path[1] && <Note />}
        </>
    )
}

export default ContributionCalc