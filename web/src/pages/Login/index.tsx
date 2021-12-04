import React, { useState } from 'react';
import Modal from '../../components/Modal';
import './login.css';

const Login = () => {
    const [showModal, setShowModal] = useState(false);

    function openModal() {
        setShowModal(true);
    }
    function closeModal() {
        setShowModal(false);
    }

    return (
        <main className='login-main'>
            <div className='left'>
                <h1 className='login-title'>Bah Respostas</h1>
                <p className='login-span'>Faça e responda perguntas usando um apelido super dahora.</p>
            </div>
            <div className='right'>
                <input className='login-input' required type='email' placeholder="Email" />
                <input className='login-input' required type="password" placeholder="Senha" />
                <button className='login' >Login</button>
                <div className='center'>
                    <button className='register' onClick={() => setTimeout(openModal, 200)} >Criar conta</button>
                </div>
            </div>
            <Modal show={showModal} onClose={() => setTimeout(closeModal, 200)} />
        </main>
    );
}
export default Login;