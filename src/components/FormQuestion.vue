<template>
    <div class="question">
        <h5 class="title-question">{{ question.title }}</h5>
        <div v-for="(alternative, i) in question.alternatives" class="form-check form-check-inline" :key="i">
            <input class="form-check-input" type="radio" :id="'alternative_' + i" :value="alternative"
                v-model="selectedAlternative">
            <label class="form-check-label" :for="'alternative_' + i">{{ alternative }}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: ['question'],
    data() {
        return {
            selectedAlternative: null
        };
    },
    watch: {
        selectedAlternative(newValue) {
            this.$emit('update:question', {
                ...this.question,
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
    border: 1px solid rgb(221, 221, 221);
    border-radius: 2%;
    margin-bottom: 5px;
}
.title-question {
    text-align: left;
    margin-bottom: 15px;
}
</style>