import Answer from './Answer'

class Question {
    id?: number;
    userId: number;
    title: string;
    body: string;
    createDate?: string;
    answers?: Array<Answer>;

    constructor(id: number, userId: number, title: string, body: string) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.body = body;
    }
}
export default Question;