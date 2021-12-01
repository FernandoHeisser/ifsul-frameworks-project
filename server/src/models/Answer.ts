class Answer {
    id?: number;
    questionId: number;
    userId: number;
    body: string;
    createDate: string;

    constructor(questionId: number, userId: number, body: string) {
        this.questionId = questionId;
        this.userId = userId;
        this.body = body;
        this.createDate = new Date().toISOString();
    }
}
export default Answer;