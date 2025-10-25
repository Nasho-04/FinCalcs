import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import type { IPeriodForm } from '../../types'
import '../../index.css'
import { calculateInvestmentPaths } from '../../utils'
import { useState } from 'react'
import { toast } from 'sonner'
import Note from '../Note/Note'
import InputsData from '../InputsData/InputsData'
import ResultsContainer from '../ResultsContainer/ResultsContainer'

const AgeCalc = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<IPeriodForm>()

    const [results, setResults] = useState([{
        pessimistic: 0,
        expected: 0,
        optimistic: 0,
        totalContribution: 0,
        year: 0
    }],
    )

    const [formInputs, setFormInputs] = useState({
        initialInvestment: 0,
        objectiveAmount: 0,
        monthlyContribution: 0,
        expectedRate: 0,
    })


    const onSubmit: SubmitHandler<IPeriodForm> = (data) => {
        const { objectiveAmount, expectedRate, monthlyContribution, initialInvestment } = data
        setFormInputs(data)
        setResults(calculateInvestmentPaths(objectiveAmount, initialInvestment, monthlyContribution, expectedRate))
        toast.success('Sccenario created successfully!')
    }

    const reset = () => {
        setFormInputs({ initialInvestment: 0, objectiveAmount: 0, monthlyContribution: 0, expectedRate: 0 })
        setResults([{
            pessimistic: 0,
            expected: 0,
            optimistic: 0,
            totalContribution: 0,
            year: 0
        }]
        )
    }

    return (
        <>
            <div className='calculator-container'>
                {results[1]
                    ? <InputsData formInputs={formInputs} results={results} reset={reset} />
                    : <form onSubmit={handleSubmit(onSubmit)} className='form'>
                        <h3 className='calculator-title'>Period Calculator</h3>
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
                                    placeholder='10000'
                                    {...register('objectiveAmount', {
                                        required: "Time period is required",
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
                                <label htmlFor="monthlyContribution">Monthly Contribution:</label>
                                <input
                                    type="number"
                                    id='monthlyContribution'
                                    placeholder='100'
                                    {...register('monthlyContribution', {
                                        required: "Monthly contribution is required",
                                        min: { value: 50, message: "Must be 50 or greater" },
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

export default AgeCalc