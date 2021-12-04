import Answer from './Answer'

class Question {
    userId: number;
    title: string;
    body: string;
    createDate: string;
    answers?: Array<Answer>;

    constructor(userId: number, title: string, body: string, createDate: string) {
        this.userId = userId;
        this.title = title;
        this.body = body;
        this.createDate = createDate;
    }
}
export default Question;