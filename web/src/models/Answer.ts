class Answer {
    id?: number;
    questionId: number;
    userId: number;
    body: string;
    createDate: string;

    constructor(questionId: number, userId: number, body: string, createDate: string) {
        this.questionId = questionId;
        this.userId = userId;
        this.body = body;
        this.createDate = createDate;
    }
}
export default Answer;