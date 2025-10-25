import './MainLayout.css'
import { Link, Outlet } from 'react-router-dom'
import '../../index.css'
import { readLocalStorage } from '../../utils'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import { useGlobalContext } from '../../GlobalContext'
import Overlay from '../../Components/Overlay/Overlay'

const MainLayout = () => {

    const [scenarios, setScenarios] = useState([])
    useEffect(() => {
        setScenarios(JSON.parse(readLocalStorage()))
    }, [])

    const { isOpen, setIsOpen, overlayTitle, overlayMessage, setOverlayMessage, setOverlayTitle, saveResults, setIsSave, deleteScenario } = useGlobalContext()

    const onCancel = (): void => {
        setOverlayTitle('')
        setOverlayMessage('')
        setIsSave(true)
        setIsOpen(false)
    }

    return (
        <main>
            <Overlay isOpen={isOpen} message={overlayMessage} title={overlayTitle} onCancel={onCancel} onConfirmSave={() => saveResults()} onConfirmDelete={() => deleteScenario()} />
            <Toaster richColors position='bottom-right' />
            <div className='floating-container'>
                <Link to={'/'} className='floating-button back'><i className="bi bi-arrow-left"></i>{' Back'}</Link>
                <div className='floating-button'>
                    <div>Saved: </div><span>{scenarios.length}</span>
                </div>
            </div>
            <div id='title-container'>
                <h1>FinCalcs</h1>
                <p id='title-description'><span className='bold-text'>Plan for the future, today.</span> Visualize your savings growth across three market scenarios (Pessimistic, Expected, Optimistic) and find your path to financial freedom.</p>
            </div>
            {scenarios.length > 0 && <Link id='saved-scenarios-link' to={'/savedscenarios'}>View Saved Scenarios</Link>}
            <Outlet />
        </main>
    )
}

export default MainLayout