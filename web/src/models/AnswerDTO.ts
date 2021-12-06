class Answer {
    id?: number;
    questionId: number;
    userId: number;
    nickname: string;
    body: string;
    createDate: string;

    constructor(id: number, questionId: number, userId: number, body: string, nickname: string) {
        this.id = id;
        this.questionId = questionId;
        this.userId = userId;
        this.body = body;
        this.nickname = nickname;
        this.createDate = new Date().toISOString();
    }
}
export default Answer;