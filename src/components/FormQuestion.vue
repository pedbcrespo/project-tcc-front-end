<template>
    <div class="question">
        <p class="title-question">{{ question.title }}</p>
        <div class="options">
            <div v-for="(alternative, i) in question.alternatives" class="form-check form-check-inline" :key="i">
                <input class="form-check-input" type="radio" :id="'alternative_' + i" :value="alternative"
                    v-model="selectedAlternative">
                <label class="form-check-label" :for="'alternative_' + i">{{ alternative }}</label>
            </div>
        </div>
    </div>
</template>

<script>
import { ConstsType } from '../enums/ConstsType';

export default {
    props: ['question'],
    data() {
        return {
            selectedAlternative: null,
            currentQuestion: this.question,
        };
    },
    methods: {
        updateAttributes() {
            const subAttributes = this.question.subAttributes;
            subAttributes.forEach(att => {
                const totalOptions = this.currentQuestion.alternatives.length;
                const percent = (this.currentQuestion.answer+1)/totalOptions;
                const value = (ConstsType[att] * percent);
                this.currentQuestion[att] = Number(value.toFixed(2));
            });
        }
    },
    watch: {
        selectedAlternative(newValue) {
            this.updateAttributes();
            this.$emit('update:question', {
                ...this.currentQuestion,
                answer: newValue
            });
        }
    }
};
</script>
<style>
.question {
    padding: 10px;
    margin-top: 10px;
    border: 2px solid rgb(221, 221, 221);
    border-radius: 2%;
    margin-bottom: 5px;
    width: 450px;
}

.title-question {
    text-align: center;
    font-size: 11pt;
    font-weight: bold;
    padding: 2%;
    border-bottom: 1px solid rgb(221, 221, 221);
    margin-bottom: 15px;
}

.options {
    display: flex;
    justify-content: center;
}
</style>