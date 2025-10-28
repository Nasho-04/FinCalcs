import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import type { ISavingsForm } from '../../types'
import '../../index.css'
import { calculateSavings } from '../../utils'
import ResultsContainer from '../ResultsContainer/ResultsContainer'
import { useState } from 'react'
import Note from '../Note/Note'
import InputsData from '../InputsData/InputsData'
import { toast } from 'sonner'

const SavingsCalc = () => {

    const [results, setResults] = useState([{
        pessimistic: 0,
        expected: 0,
        optimistic: 0,
        totalContribution: 0,
        year: 0
    }])

    const [formInputs, setFormInputs] = useState({
        initialInvestment: 0,
        timePeriod: 0,
        monthlyContribution: 0,
        expectedRate: 0,
    })

    const { register, handleSubmit, formState: { errors } } = useForm<ISavingsForm>()
    
    const onSubmit: SubmitHandler<ISavingsForm> = (data) => {
        const { timePeriod, expectedRate, monthlyContribution, initialInvestment } = data
        setFormInputs(data)
        setResults(calculateSavings(initialInvestment, monthlyContribution, timePeriod, expectedRate))
        toast.success('Scenario created successfully!')
    }

    const reset = () => {
        setFormInputs({ initialInvestment: 0, timePeriod: 0, monthlyContribution: 0, expectedRate: 0 })
        setResults([{
            pessimistic: 0,
            expected: 0,
            optimistic: 0,
            totalContribution: 0,
            year: 0
        }])
    }

    return (
        <>
            <div className='calculator-container'>
                {results[1]
                    ? <InputsData formInputs={formInputs} reset={reset} results={results} />
                    : <form onSubmit={handleSubmit(onSubmit)} className='form'>
                        <h3 className='calculator-title'>Savings Calculator</h3>
                        <fieldset className='fieldset'>
                            <div className='input-container'>
                                <label htmlFor="initialInvestment">Initial Investment:</label>
                                <input
                                    type='number'
                                    id='initialInvestment'
                                    placeholder='0'
                                    maxLength={7}
                                    {...register('initialInvestment', {
                                        required: "Initial investment is required",
                                        min: { value: 0, message: "Must be 0 or greater" },
                                        max: { value: 9999999, message: "Must be 9,999,999 or less" },
                                        valueAsNumber: true,
                                    })
                                    }
                                />
                            </div>
                            {errors.initialInvestment && <p className='form-error'>{errors.initialInvestment.message}</p>}
                        </fieldset>
                        <fieldset className='fieldset'>
                            <div className='input-container'>
                                <label htmlFor="timePeriod">Time Period (Years):</label>
                                <input
                                    type="number"
                                    id='timePeriod'
                                    placeholder='1'
                                    {...register('timePeriod', {
                                        required: "Time period is required",
                                        min: { value: 1, message: "Must be 1 or greater" },
                                        max: { value: 50, message: "Must be 50 or less" },
                                        valueAsNumber: true
                                    })
                                    }
                                />
                            </div>
                            {errors.timePeriod && <p className='form-error'>{errors.timePeriod.message}</p>}
                        </fieldset>
                        <fieldset className='fieldset'>
                            <div className='input-container'>
                                <label htmlFor="monthlyContribution">Monthly Contribution:</label>
                                <input
                                    type="number"
                                    id='monthlyContribution'
                                    placeholder='100'
                                    {...register('monthlyContribution', {
                                        required: "Monthly contribution is required",
                                        min: { value: 50, message: "Must be 50 or greater" },
                                        max: { value: 9999, message: "Must be 9,999 or less" },
                                        valueAsNumber: true
                                    })
                                    }
                                />
                            </div>
                            {errors.monthlyContribution && <p className='form-error'>{errors.monthlyContribution.message}</p>}
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
                                        max: { value: 100, message: "Must be 100 or less" },
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

            <ResultsContainer data={results} />
            {results[1] && <Note />}
        </>
    )
}

export default SavingsCalc