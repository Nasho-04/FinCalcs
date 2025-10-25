import './InputsData.css'
import '../../index.css'
import { useGlobalContext } from '../../GlobalContext'
import type { ScenarioData } from '../../types'


const InputsData = (
    { formInputs, reset, results }:
        {
            formInputs: { initialInvestment?: number, timePeriod?: number, monthlyContribution?: number, expectedRate?: number, objectiveAmount?: number },
            reset: Function,
            results: ScenarioData[]
        }) => {

        const { setIsOpen, setOverlayMessage, setOverlayTitle, setIsSave, setScenarios } = useGlobalContext()


    return (
        <>
            <div className='inputs-data-container'>
                <h2 className='inputs-data-title'>Your Inputs:</h2>
                <ul className='inputs-data-list'>
                    {formInputs.timePeriod && <li>Time Period: {formInputs.timePeriod} years</li>}
                    {(formInputs.initialInvestment || formInputs.initialInvestment === 0) && <li>Initial Investment: ${formInputs.initialInvestment}</li>}
                    {formInputs.monthlyContribution && <li>Monthly Contribution: ${formInputs.monthlyContribution}</li>}
                    {formInputs.expectedRate && <li>Expected Rate: {formInputs.expectedRate}%</li>}
                    {formInputs.objectiveAmount && <li>Objective Amount: ${formInputs.objectiveAmount}</li>}
                </ul>
                <div className='inputs-data-button-container'>
                    <div onClick={() => reset()} className='inputs-data-button'>Restart</div>
                    <div onClick={() => {
                        setIsOpen(true)
                        setOverlayTitle('Save Scenario')
                        setOverlayMessage('Are you sure you want to save this scenario?')
                        setIsSave(true)
                        setScenarios({ results, inputs: formInputs })
                        }} className='inputs-data-button save'>Save</div>
                </div>
            </div>
        </>
    )
}

export default InputsData