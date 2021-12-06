import React, { ChangeEvent, FormEvent, KeyboardEvent, KeyboardEventHandler, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Answer from '../../models/Answer';
import AnswerDTO from '../../models/AnswerDTO';
import QuestionDTO from '../../models/QuestionDTO';
import User from '../../models/User';
import api from '../../services/api';
import './question.css'

const Question = () => {
    const history = useHistory();
    const [user, setUser] = useState<User>();
    const [question, setQuestion] = useState<QuestionDTO>();
    const [asnwers, setAnswers] = useState<AnswerDTO[]>([]);
    const [asnwer, setAnswer] = useState("");
    const [searchParameter, setSearchParameter] = useState("");

    function logOut() {
        if (window.confirm("Tem certeza que deseja sair?")) {
            localStorage.clear();
            history.push('/');
        }
    }

    function handleAnswer(event: ChangeEvent<HTMLTextAreaElement>) {
        setAnswer(event.target.value);
    }

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearchParameter(event.target.value);
    }

    function backHome() {
        history.push('/home');
    }

    async function handleSubmit(event: FormEvent) {
        const userId = localStorage.getItem('userId');
        const questionId = localStorage.getItem('questionId');

        if (userId !== null && questionId !== null) {
            const answer = {
                questionId: questionId,
                userId: userId,
                body: asnwer
            }
            console.log(question);
            const response = await api.post('answer', answer);

            if (response.status !== 201) {
                event.preventDefault();
            }
        }
    }

    function goToAnswer(questionId: number) {
        localStorage.setItem('questionId', questionId.toString());
        window.location.reload();
    }

    async function searchQuestions(event: { key: string; }) {
        if (event.key === 'Enter') {
            localStorage.setItem('search-parameter', searchParameter);
            history.push('/home');
        }
    }

    useEffect(() => {
        async function getQuestion() {
            const userId = localStorage.getItem('userId');
            const questionId = localStorage.getItem('questionId');

            const responseUser = await api.get(`user/${userId}`);
            const response = await api.get(`question/${questionId}`);
            const responseQuestionUser = await api.get(`user/${response.data.userId}`);
            const responseAnswers = await api.get(`answers/question/${questionId}`);

            const answers: Answer[] = responseAnswers.data;
            let answerDTOs: AnswerDTO[] = [];

            for (const answer of answers) {

                const responseUser = await api.get(`user/${answer.userId}`);
                const user: User = responseUser.data;

                answerDTOs.push({
                    id: answer.id,
                    questionId: answer.questionId,
                    userId: answer.userId,
                    nickname: user.nickname,
                    body: answer.body,
                    createDate: answer.createDate
                });
            }

            const question: QuestionDTO = {
                id: response.data.id,
                userId: response.data.userId,
                nickname: responseQuestionUser.data.nickname,
                title: response.data.title,
                body: response.data.body,
                createDate: response.data.createDate,
                answersCount: answerDTOs.length,
                answers: answerDTOs
            }

            setUser(responseUser.data);
            setQuestion(question);
        }
        getQuestion();

        async function getAnswers() {
            const response = await api.get('answer-list');
            setAnswers(response.data);
        }
        getAnswers();
    }, []);

    return (
        <div id="page-question-page">
            <div className="content">
                <header className='question-page-header'>
                    <div className='header-left'>
                        <h1 onClick={backHome} className='question-page-title'>Bah Respostas</h1>
                    </div>
                    <div className='header-middle'>
                        <input className='question-page-header-input' type="text" placeholder='Procurar no Bah Respostas' onKeyPress={searchQuestions} onChange={handleSearch} />
                    </div>
                    <div className='header-right'>
                        <p className='header-message'>Olá, {user?.nickname}</p>
                        <button onClick={logOut} className='header-button'>Sair</button>
                    </div>
                </header>
                <main className='question-page-main'>
                    <div className='question-page-main-left'>
                        <div className='question-page-left-menu'>
                            <div className='question-page-left-menu-header'>
                                <p>Respostas recentes</p>
                            </div>
                            <div className='question-page-left-menu-content'>
                                <ul className="question-page-left-menu-list">
                                    {asnwers.slice(0, 5).map(answer => (
                                        <li key={answer.id}>
                                            <p onClick={() => goToAnswer(answer.questionId)} className="question-page-left-menu-item-content">{answer.body}</p>
                                            <p className="question-page-left-menu-item-user">{answer.nickname}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='question-page-main-middle'>
                        <div className='question-card'>
                            <div className='question-card-header'>
                                <h1 className='question-card-title'>{question?.title}</h1>
                            </div>
                            <div className='question-card-content'>
                                <p className='question-card-body'>{question?.body}</p>
                            </div>
                            <div className='question-card-footer'>
                                <div className='question-card-answers'>
                                    <span className='question-card-number-answers'>{question?.answersCount}</span>
                                    <p className='question-card-answers-text'>{question?.answersCount === 1 ? 'resposta' : 'respostas'}</p>
                                </div>
                                <div className='question-card-user-information'>
                                    <p className='card-user-nickname'>{question?.nickname}</p>
                                </div>
                            </div>
                            <div className='question-card-answer-box'>
                                <form onSubmit={handleSubmit}>
                                    <div className='question-card-answer-box-above'>
                                        <textarea required className='question-card-answer-box-text-area' placeholder='Responda aqui...' onChange={handleAnswer}></textarea>
                                    </div>
                                    <div className='question-card-answer-box-below'>
                                        <p className='question-card-answer-box-nickname'>{user?.nickname}</p>
                                        <button type='submit' className='question-card-answer-box-button'>Responder</button>
                                    </div>
                                </form>
                            </div>
                            {question?.answersCount !== undefined && question?.answersCount > 0 ?
                                question.answers.map(answer => (
                                    <div key={answer.id} className='question-card-answer'>
                                        <p className='question-card-answer-body'>{answer.body}</p>
                                        <p className='question-card-answer-user'>{answer.nickname}</p>
                                    </div>
                                )) :
                                null}
                        </div>
                    </div>
                    <div className='question-page-main-right'>
                    </div>
                </main>
            </div>
        </div>
    );
}
export default Question;