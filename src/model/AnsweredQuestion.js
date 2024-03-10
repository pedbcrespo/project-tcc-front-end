export default class Question {
    constructor(question) {
        this.title = question.title;
        this.attribute = question.attribute;
        this.alternatives = [1, 2, 3, 4, 5]
        this.answer = null;
    }
}