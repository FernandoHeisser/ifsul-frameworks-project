import React from 'react';
import './modal.css';

const Modal = (props: any) => {

    if (!props.show) {
        return null;
    }

    return (
        <div onClick={props.onClose} className="modal-background">
            <div onClick={e => e.stopPropagation()} className='modal'>
                <header className='modal-header'>
                    <h1 className='modal-title'>Crie sua conta</h1>
                </header>
                <div className='modal-content'>
                    <input className='modal-input' placeholder='Email' required type="email" />
                    <input className='modal-input' placeholder='Senha' required type="password" />
                    <p className='modal-span'>Crie um apelido original e divertido</p>
                    <input className='modal-input' placeholder='Apelido' required type="text" />
                    <button className='modal-button'>Cadastre-se</button>
                </div>
            </div>
        </div>
    );
}
export default Modal;