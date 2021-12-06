import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router';
import RegisterModal from '../../components/RegisterModal';
import User from '../../models/User';
import api from '../../services/api';
import './login.css';

const Login = () => {
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [users, setUsers] = useState([]);

    function openModal() {
        setShowModal(true);
    }
    function closeModal() {
        setShowModal(false);
        setErrorFlag(false);
    }
    function handleEmail(event: ChangeEvent<HTMLInputElement>) {
        const email = event.target.value;
        setEmail(email);
    }
    function handlePassword(event: ChangeEvent<HTMLInputElement>) {
        const password = event.target.value;
        setPassword(password);
    }
    function handleSubmit(event: FormEvent) {
        const foundWithEmail = users.find((user: User) => user.email === email);
        if (foundWithEmail !== undefined) {
            const foundWithPassword = users.find((user: User) => user.password === password);
            if (foundWithPassword !== undefined) {
                login(foundWithPassword);
            } else {
                alertError();
            }
        } else {
            alertError();
        }
        event.preventDefault();
    }
    function alertError() {
        setErrorFlag(true);
    }
    function login(user: User) {
        setErrorFlag(false);
        if (user.id !== undefined) {
            localStorage.setItem('userId', user?.id.toString());
            history.push('/home');
        }
    }

    useEffect(() => {
        async function getUsers() {
            const response = await api.get('users');
            setUsers(response.data);
        }
        getUsers();
    }, []);

    return (
        <main className='login-main'>
            <div className='left'>
                <h1 className='login-title'>Bah Respostas</h1>
                <p className='login-span'>Faça e responda perguntas usando um apelido super dahora.</p>
            </div>
            <form onSubmit={handleSubmit} >
                <div className='right'>
                    <input className={errorFlag ? 'login-wrong-input' : 'login-input'} required type='email' placeholder="Email" onChange={handleEmail} />
                    <input className={errorFlag ? 'login-wrong-input' : 'login-input'} required type="password" placeholder="Senha" onChange={handlePassword} />
                    <button type='submit' className='login' >Login</button>
                    <p className={errorFlag ? 'login-error-message' : 'login-error-message-none'}>Email ou senha incorreto.</p>
                    <div className='center'>
                        <button type='button' className='register' onClick={() => setTimeout(openModal, 200)} >Criar conta</button>
                    </div>
                </div>
            </form>
            <RegisterModal show={showModal} onClose={() => setTimeout(closeModal, 200)} />
        </main>
    );
}
export default Login;