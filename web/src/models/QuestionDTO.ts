import AnswerDTO from './AnswerDTO'

class QuestionDTO {
    id: number;
    userId: number;
    nickname?: string;
    title: string;
    body: string;
    createDate: string;
    answersCount: number;
    answers: AnswerDTO[];

    constructor(id: number, userId: number, title: string, body: string, nickname: string) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.body = body;
        this.nickname = nickname;
        this.createDate = new Date().toISOString();
        this.answers = [];
        this.answersCount = 0;
    }
}
export default QuestionDTO;