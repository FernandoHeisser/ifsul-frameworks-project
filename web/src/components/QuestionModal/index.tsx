import React, { ChangeEvent, FormEvent, useState } from 'react';
import api from '../../services/api';
import './questionModal.css'

const QuestionModal = (props: any) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    function handleTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function handleBody(event: ChangeEvent<HTMLTextAreaElement>) {
        setBody(event.target.value);
    }

    async function handleSubmit(event: FormEvent) {
        const userId = localStorage.getItem('userId');
        if (userId != null) {
            const question = {
                title: title,
                body: body,
                userId: +userId
            }
            console.log(question);
            const response = await api.post('question', question);

            if (response.status !== 201) {
                event.preventDefault();
            }
        }
    }

    if (!props.show) {
        return null;
    }

    return (
        <div onClick={props.onClose} className="question-modal-background">
            <div onClick={e => e.stopPropagation()} className='question-modal'>
                <header className='question-modal-header'>
                    <h1 className='question-modal-title'>Faça uma pergunta</h1>
                </header>
                <div className='question-modal-content'>
                    <form onSubmit={handleSubmit}>
                        <input className='question-modal-input' placeholder='Titulo' required type="text" onChange={handleTitle} />
                        <textarea className='question-modal-textarea' placeholder='Detalhes' required onChange={handleBody}></textarea>
                        <button type='submit' className='question-modal-button'>Publicar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default QuestionModal;