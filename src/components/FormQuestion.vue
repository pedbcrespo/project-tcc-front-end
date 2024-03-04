<template>
    <div>
        <h5>{{ question.title }}</h5>
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
