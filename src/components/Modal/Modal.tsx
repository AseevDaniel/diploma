import React from "react";
import './modal.scss'

type Sizes = 'small' | 'medium' | 'large'

interface ModalProps {
    onClose: () => void
    size?: Sizes
}


export const Modal: React.FC<ModalProps> = ({onClose, size = 'small', children}) => {

    const modalClasses = `modal modal-${size}`

    return <>
        <div className="modal-mask"/>
        <div className={modalClasses}>
            <button onClick={onClose}>close</button>
            {children}
        </div>
    </>
}