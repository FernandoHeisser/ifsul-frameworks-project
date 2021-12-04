import React, { useState, ChangeEvent, FormEvent } from 'react';
import User from '../../models/User';
import './modal.css';

const Modal = (props: any) => {
    const [errorEmailFlag, setErrorEmailFlag] = useState(false);
    const [errorNicknameFlag, setErrorNicknameFlag] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const [users, setUsers] = useState([]);

    function handleEmail(event: ChangeEvent<HTMLInputElement>) {
        const email = event.target.value;
        setEmail(email);
    }
    function handlePassword(event: ChangeEvent<HTMLInputElement>) {
        const password = event.target.value;
        setPassword(password);
    }
    function handleNickname(event: ChangeEvent<HTMLInputElement>) {
        const nickname = event.target.value;
        setNickname(nickname);
    }
    function handleSubmit(event: FormEvent) {
        let foundWithEmail = users.find((user: User) => user.email === email);
        console.log(foundWithEmail);
        return;
        if (foundWithEmail !== undefined) {
            alertEmail();
        } else {
            let foundWithNickname = users.find((user: User) => user.nickname === nickname);
            if (foundWithNickname !== undefined) {
                alertNickname();
            } else {
                register();
            }
        }
        event.preventDefault();
        props.onClose();
    }
    function alertEmail() {
        setErrorEmailFlag(true);
    }
    function alertNickname() {
        setErrorNicknameFlag(true);
    }
    function register() {
        setErrorEmailFlag(false);
        setErrorNicknameFlag(false);
    }

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
                        <p className={errorEmailFlag ? 'modal-error-message' : 'modal-error-message-none'}>Email ou senha incorreto.</p>
                        <input className='modal-input' placeholder='Senha' required type="password" onChange={handlePassword} />
                        <p className='modal-span'>Crie um apelido original e divertido</p>
                        <input className={errorNicknameFlag ? 'modal-input-error' : 'modal-input'} placeholder='Apelido' required type="text" onChange={handleNickname} />
                        <p className={errorNicknameFlag ? 'modal-error-message' : 'modal-error-message-none'}>Email ou senha incorreto.</p>
                        <button className='modal-button'>Cadastre-se</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Modal;