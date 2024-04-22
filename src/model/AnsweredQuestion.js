export default class Question {
    constructor(question) {
        this.title = question.title;
        this.increase = question.increase;
        this.decrease = question.decrease;
        this.subAttributes = question.subAttributes;
        this.pontuations = question.pontuations;
        this.alternatives = [1, 2, 3, 4, 5]
        this.answer = 5;
    }
}