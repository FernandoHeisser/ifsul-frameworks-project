import Answer from './Answer'

class Question {
    id?: number;
    userId: number;
    title: string;
    body: string;
    createDate: string;
    answers?: Array<Answer>[];

    constructor(userId: number, title: string, body: string) {
        this.userId = userId;
        this.title = title;
        this.body = body;
        this.createDate = new Date().toISOString();
    }
}
export default Question;