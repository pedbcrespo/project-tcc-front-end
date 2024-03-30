export default class Question {
    constructor(question) {
        this.title = question.title;
        this.increase = question.increase;
        this.decrease = question.decrease;
        this.subAttributes = question.subAttributes;
        this.alternatives = [1, 2, 3, 4, 5]
        this.answer = null;
        this.hoursLightEstiamte = 0;
        this.ltWaterConsume = 0;
        this.alimentation = 0;
        this.hygiene = 0;
        this.transportation = 0;
        this.health = 0;
        this.recreation = 0;
    }
}