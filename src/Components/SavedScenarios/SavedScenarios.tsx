import { useEffect, useState } from "react"
import { readLocalStorage } from "../../utils"
import './SavedScenarios.css'
import '../../index.css'
import ResultsContainer from "../ResultsContainer/ResultsContainer"
import Note from "../Note/Note"
import { useGlobalContext } from "../../GlobalContext"
import type { IResults } from "../../types"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


const SavedScenarios = () => {

    const navigation = useNavigate()

    const { setIndex } = useGlobalContext()
    const [scenarios, setScenarios] = useState([])
    const [results, setResults] = useState([
        {
            pessimistic: 0,
            expected: 0,
            optimistic: 0,
            totalContribution: 0,
            year: 0
        }
    ])

    const { setIsOpen, setOverlayMessage, setOverlayTitle, setIsSave, savedScenarios } = useGlobalContext()

    useEffect(() => {
        setScenarios(JSON.parse(readLocalStorage()))
        if (savedScenarios.length === 0) {
            navigation('/')
            toast.warning('No saved scenarios found.')
        }
    }, [savedScenarios])

    return (
        <>
            <h2 id="saved-scenarios-title">Saved Scenarios</h2>
            {
                scenarios.length > 0 && <section id="saved-scenarios-section">
                        {
                            scenarios.map((scenario: IResults, index: number) => {
                                return (
                                    <article className="saved-scenario" key={index}>
                                        <h3 className="scenario-title">Scenario {index + 1}</h3>
                                        <ul className="scenario-inputs">
                                            <li className="scenario-input">Initial Investment: <span className="amount">${scenario.inputs.initialInvestment}</span></li>
                                            {scenario.inputs.monthlyContribution && <li className="scenario-input" >Monthly Contribution: <span className="amount">${scenario.inputs.monthlyContribution}</span></li>}
                                            {scenario.inputs.timePeriod && <li className="scenario-input">Period: <span className="amount">{scenario.inputs.timePeriod} Years</span></li>}
                                            <li className="scenario-input">Expected Rate: <span className="amount">{scenario.inputs.expectedRate}%</span></li>
                                            {scenario.inputs.objectiveAmount && <li className="scenario-input">Objective Amount: <span className="amount">${scenario.inputs.objectiveAmount}</span></li>}
                                        </ul>
                                        <div className="saved-scenarios-buttons">
                                            <div className="saved-scenarios-btn" onClick={() => {
                                                setIsOpen(true)
                                                setOverlayTitle('Delete Scenario')
                                                setOverlayMessage(`Are you sure you want to delete Scenario ${index + 1}?`)
                                                setIsSave(false)
                                                setIndex(index)
                                                setResults([
                                                    {
                                                        pessimistic: 0,
                                                        expected: 0,
                                                        optimistic: 0,
                                                        totalContribution: 0,
                                                        year: 0
                                                    }
                                                ])
                                            }}>Delete</div>
                                            <div className="saved-scenarios-btn" onClick={() => setResults(scenario.results)}>Graph</div>
                                        </div>
                                    </article>
                                )
                            })}
                    </section>
            }

            <ResultsContainer data={results} />
            {results[1] && <Note />}
        </>
    )
}

export default SavedScenarios