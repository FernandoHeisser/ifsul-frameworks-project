import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import QuestionModal from '../../components/QuestionModal';
import AnswerDTO from '../../models/AnswerDTO';
import QuestionDTO from '../../models/QuestionDTO';
import User from '../../models/User';
import api from '../../services/api';
import './home.css'

const Login = () => {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState<User>();
    const [questions, setQuestions] = useState<QuestionDTO[]>([]);
    const [asnwers, setAnswers] = useState<AnswerDTO[]>([]);

    function openModal() {
        setShowModal(true);
    }
    function closeModal() {
        setShowModal(false);
    }
    function logOut() {
        if (window.confirm("Tem certeza que deseja sair?")) {
            localStorage.clear();
            history.push('/');
        }
    }
    function goToQuestion(questionId: number) {
        localStorage.setItem('questionId', questionId.toString());
        history.push('/question');
    }
    function goToAnswer(questionId: number) {
        localStorage.setItem('questionId', questionId.toString());
        history.push('/question');
    }
    async function searchQuestions(event: ChangeEvent<HTMLInputElement>) {
        const searchParameter = event.target.value;

        if (searchParameter === '' || searchParameter === undefined || searchParameter === null) {
            var response = await api.get(`question-list`);
        } else {
            var response = await api.get(`question-list/search/${searchParameter}`);
        }

        if (response.status === 200) {
            setQuestions(response.data);
        }
    }

    function backHome() {
        window.location.reload();
    }

    useEffect(() => {
        async function getUser() {
            const userId = localStorage.getItem('userId');
            const response = await api.get(`user/${userId}`);
            setUser(response.data);
        }
        getUser();

        async function getQuestions() {
            const searchParameter = localStorage.getItem('search-parameter');
            if (searchParameter === null) {
                const response = await api.get('question-list');
                setQuestions(response.data);
            } else {
                const response = await api.get(`question-list/search/${searchParameter}`);
                setQuestions(response.data);
                localStorage.removeItem('search-parameter');
            }

        }
        getQuestions();

        async function getAnswers() {
            const response = await api.get('answer-list');
            setAnswers(response.data);
        }
        getAnswers();
    }, []);

    return (
        <div id="page-home">
            <div className="content">
                <header className='home-header'>
                    <div className='header-left'>
                        <h1 onClick={backHome} className='home-title'>Bah Respostas</h1>
                    </div>
                    <div className='header-middle'>
                        <input className='home-header-input' type="text" placeholder='Procurar no Bah Respostas' onChange={searchQuestions} />
                    </div>
                    <div className='header-right'>
                        <p className='header-message'>Olá, {user?.nickname}</p>
                        <button onClick={logOut} className='header-button'>Sair</button>
                    </div>
                </header>
                <main className='home-main'>
                    <div className='home-main-left'>
                        <div className='home-left-menu'>
                            <div className='home-left-menu-header'>
                                <p>Respostas recentes</p>
                            </div>
                            <div className='home-left-menu-content'>
                                <ul className="home-left-menu-list">
                                    {asnwers.slice(0, 5).map(answer => (
                                        <li key={answer.id}>
                                            <p onClick={() => goToAnswer(answer.questionId)} className="home-left-menu-item-content">{answer.body}</p>
                                            <p className="home-left-menu-item-user">{answer.nickname}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='home-main-middle'>
                        <ul className="home-main-middle-list">
                            {questions.map(question => (
                                <li key={question.id}>
                                    <div onClick={() => goToQuestion(question.id)} className='question-card'>
                                        <div className='question-card-header'>
                                            <h1 className='question-card-title'>{question.title}</h1>
                                        </div>
                                        <div className='question-card-content'>
                                            <p className='question-card-body'>{question.body}</p>
                                        </div>
                                        <div className='question-card-footer'>
                                            <div className='question-card-answers'>
                                                <button className='question-card-answer-button'>Responder</button>
                                                <span className='question-card-number-answers'>{question.answersCount}</span>
                                                <p className='question-card-answers-text'>{question.answersCount === 1 ? 'resposta' : 'respostas'}</p>
                                            </div>
                                            <div className='question-card-user-information'>
                                                <p className='card-user-nickname'>{question.nickname}</p>
                                            </div>
                                        </div>
                                        {question.answers.length > 0 ?
                                            question.answers.slice(0, 2).map(answer => (
                                                <div className='question-card-answer'>
                                                    <p className='question-card-answer-body'>{answer.body}</p>
                                                    <p className='question-card-answer-user'>{answer.nickname}</p>
                                                </div>
                                            ))
                                            :
                                            null}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='home-main-right'>
                        <button onClick={() => {
                            showModal ?
                                closeModal() :
                                setTimeout(openModal, 200)

                        }} className={showModal ? 'home-right-button-close' : 'home-right-button'}>{showModal ? 'X' : '+'}</button>
                    </div>
                </main>
            </div>
            <QuestionModal show={showModal} onClose={() => setTimeout(closeModal, 200)} />
        </div>
    );
}
export default Login;