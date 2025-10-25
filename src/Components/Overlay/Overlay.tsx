import './Overlay.css'
import '../../index.css'
import { type MouseEventHandler } from 'react'
import { useGlobalContext } from '../../GlobalContext'

const Overlay = ({ isOpen, title, message, onConfirmSave, onConfirmDelete, onCancel }: { isOpen: boolean, title: string, message: string, onConfirmDelete: Function, onConfirmSave: Function, onCancel: MouseEventHandler<HTMLButtonElement> }) => {

    const { isSave } = useGlobalContext()

    scroll(0, 0)
    if(isOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'auto'
    }

    return (
        <div style={{ display: isOpen ? 'flex' : 'none' }} id="overlay">
            <div className="overlay-content">
                <div className="overlay-header">
                    <h2 className="overlay-title">{title}</h2>
                    <button className="close-button" onClick={onCancel}>X</button>
                </div>
                <div className="overlay-body">
                    <p>{message}</p>
                </div>
                <div className="overlay-footer">
                    <button className="cancel-button overlay-button" onClick={onCancel}>Cancel</button>
                    <button className="confirm-button overlay-button" onClick={isSave ? () => onConfirmSave() : () => onConfirmDelete()}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default Overlay