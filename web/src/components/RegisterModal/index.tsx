import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import User from '../../models/User';
import api from '../../services/api';
import './modal.css';

const Modal = (props: any) => {
    const [errorEmailFlag, setErrorEmailFlag] = useState(false);
    const [errorNicknameFlag, setErrorNicknameFlag] = useState(false);
    const [createdFlag, setCreatedFlag] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const [users, setUsers] = useState([]);

    function handleEmail(event: ChangeEvent<HTMLInputElement>) {
        setErrorEmailFlag(false);
        const email = event.target.value;
        setEmail(email);
    }
    function handlePassword(event: ChangeEvent<HTMLInputElement>) {
        const password = event.target.value;
        setPassword(password);
    }
    function handleNickname(event: ChangeEvent<HTMLInputElement>) {
        setErrorNicknameFlag(false);
        const nickname = event.target.value;
        setNickname(nickname);
    }
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        let foundWithEmail = users.find((user: User) => user.email === email);
        if (foundWithEmail !== undefined) {
            alertEmail();
            return;
        } else {
            let foundWithNickname = users.find((user: User) => user.nickname === nickname);
            if (foundWithNickname !== undefined) {
                alertNickname();
                return;
            } else {
                if (await register()) {
                    setCreatedFlag(true);
                    setTimeout(() => props.onClose(), 1000);
                }
            }
        }
    }
    function alertEmail() {
        setErrorEmailFlag(true);
    }
    function alertNickname() {
        setErrorNicknameFlag(true);
    }
    async function register() {
        setErrorEmailFlag(false);
        setErrorNicknameFlag(false);

        const createdUser: User = {
            email: email,
            password: password,
            nickname: nickname
        }

        const response = await api.post('user', createdUser);

        if (response.data === undefined) {
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        async function getUsers() {
            let response = await api.get('users');
            setUsers(response.data);
        }
        getUsers();
    }, []);

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
                    <form onSubmit={handleSubmit}>
                        <input className={errorEmailFlag ? 'modal-input-error' : 'modal-input'} placeholder='Email' required type="email" onChange={handleEmail} />
                        <p className={errorEmailFlag ? 'modal-error-message' : 'modal-error-message-none'}>Email já cadastrado.</p>
                        <input className='modal-input' placeholder='Senha' required type="password" onChange={handlePassword} />
                        <p className='modal-span'>Crie um apelido original e divertido</p>
                        <input className={errorNicknameFlag ? 'modal-input-error' : 'modal-input'} placeholder='Apelido' required type="text" onChange={handleNickname} />
                        <p className={errorNicknameFlag ? 'modal-error-message' : 'modal-error-message-none'}>Apelido já cadastrado.</p>
                        <button type='submit' className='modal-button'>Cadastre-se</button>
                        <p className={createdFlag ? 'account-created' : 'account-created-none'}>Conta criada com sucesso!</p>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Modal;