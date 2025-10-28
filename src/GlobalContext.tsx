import { useState } from 'react';
import {createContext, useContext } from 'react'
import { toast } from 'sonner';
import { deleteFromLocalStorage, readLocalStorage, saveToLocalStorage } from './utils';



const GlobalContext = createContext({
    isOpen: false,
    setIsOpen: (property: boolean) => {property},
    overlayTitle: '',
    overlayMessage: '',
    setOverlayTitle: (property: string) => {property},
    setOverlayMessage: (property: string) => {property},
    saveResults: () => {},
    isSave: false,
    setIsSave: (property: boolean) => {property},
    setScenarios: (property: any) => {property},
    deleteScenario: () => {},
    setIndex: (property: number) => {property},
    savedScenarios: [],
    setSavedScenarios: (property: any) => {property}
})

export const GlobalContextProvider = ({children}: any) => {

    const [isOpen, setIsOpen] = useState(false)
    const [index, setIndex] = useState(100)
    const [overlayTitle, setOverlayTitle] = useState('')
    const [overlayMessage, setOverlayMessage] = useState('')
    const [isSave, setIsSave] = useState(false)
    const [scenarios, setScenarios]= useState({
        results: [{
            pessimistic: 0,
            expected: 0,
            optimistic: 0,
            totalContribution: 0,
            year: 0
        }],
        inputs: {}
    })
    const [savedScenarios, setSavedScenarios] = useState([])

    const resetOverlay = (): void => {
        setOverlayTitle('')
        setOverlayMessage('')
        setIsSave(false)
        setIsOpen(false)
    }

    const saveResults = (): void => {
        const savedScenarios = JSON.parse(readLocalStorage())
        if (savedScenarios.length === 6) {
            toast.error('You can only save 6 scenarios')
            return
        }
        if (savedScenarios.length === 0) {
            saveToLocalStorage(scenarios)
            setSavedScenarios(JSON.parse(readLocalStorage()))
            toast.success('Scenario saved successfully!')
            resetOverlay()
            return
        }
        for (const scenario of savedScenarios) {
            if (scenario.results[1].pessimistic === scenarios.results[1].pessimistic && scenario.results[1].optimistic === scenarios.results[1].optimistic && scenario.results[1].expected === scenarios.results[1].expected) {
                toast.error('Scenario already saved')
                resetOverlay()
                return
            }
            else {
                saveToLocalStorage(scenarios)
                setSavedScenarios(JSON.parse(readLocalStorage()))
                toast.success('Scenario saved successfully!')
                setIsOpen(false)
                resetOverlay()
                return
            }
        }
    }

        const deleteScenario = (): void => {
            deleteFromLocalStorage(index)
            setSavedScenarios(JSON.parse(readLocalStorage()))
            toast.success('Scenario deleted successfully!')
            resetOverlay()
        }


    return (
        <GlobalContext.Provider value={{
            isOpen,
            setIsOpen,
            overlayTitle,
            overlayMessage,
            setOverlayTitle,
            setOverlayMessage,
            saveResults,
            isSave,
            setIsSave,
            setScenarios,
            deleteScenario,
            setIndex,
            savedScenarios,
            setSavedScenarios
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)