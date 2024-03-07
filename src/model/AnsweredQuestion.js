export default class Question {
    constructor(title) {
        this.title = title;
        this.alternatives = [1, 2, 3, 4, 5]
        this.answer = null;
    }
}