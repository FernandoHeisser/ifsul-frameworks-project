import React from 'react';
import './styles.css';

const Login = () => {
    return (
        <main>
            <div className='left'>
                <h1>Bah Respostas</h1>
                <p>Faça e responda perguntas usando um apelido super dahora.</p>
            </div>
            <div className='right'>
                <input required type='email' placeholder="Email" />
                <input required type="password" placeholder="Password" />
                <button className='login' >Login</button>
                <div className='center'>
                    <button className='register'>Criar conta</button>
                </div>
            </div>
        </main>
    );
}
export default Login;