<template>
  <div class="home">
    <title-header />
    <div v-if="isFormVisible" class="container-form">
      <h3 class="title-form">Quiz</h3>
      <form class="form-ttt" @submit.prevent="getRecomendation">
        <div v-for="(question, i) in questions" :key="i">
          <form-question :question="question" @update:question="updateQuestion($event, i)" />
        </div>
        <input class="btn btn-outline-secondary" type="submit" value="Submit">
      </form>
    </div>
    <div class="recomendation" v-else>
      <input class="btn btn-outline-secondary" type="submit" value="Voltar" @click="comeBack">
    </div>
  </div>
</template>

<script>
import TitleHeader from './TitleHeader.vue';
import BackendService from '@/service/backendService';
import text_questions from '@/static/text_questions';
import FormQuestion from './FormQuestion.vue';

export default {
  name: 'home-page',
  components: { TitleHeader, FormQuestion },
  data() {
    return {
      isFormVisible: true,
      service: new BackendService(),
      questions: [],
      cities: [],
    }
  },
  mounted() {
    this.questions = text_questions;
    this.$refs.instructionsModal.open();
  },
  methods: {
    updateQuestion(updatedQuestion, index) {
      this.questions[index] = updatedQuestion;
    },
    getRecomendation() {
      let answeredQuestions = this.questions.filter(question => question.answer)
      if (answeredQuestions.length == 0) return;
      this.service.getRecomendation(answeredQuestions);
      this.isFormVisible = false;
    },
    comeBack() {
      this.isFormVisible = true;
    }
  }
}
</script>

<style scoped>
.container-form,
.recomendation {
  align-items: center;
}

.title-form {
  margin-top: 10px;
  text-align: center;
}

.form-ttt {
  display: flex;
  align-items: center;
  margin-left: 39%;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  width: 350px;
  flex-wrap: wrap;
}
</style>
