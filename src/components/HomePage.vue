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
    <div class="city-recomended" v-else>
      <div v-if="isLoading" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div v-else class="recomendation">
        <div v-if="recomendation">
          <h2>{{getFirstRecomendation.name}}</h2>
          <ul>
            <li>{{getFirstRecomendation.idh}}</li>
            <li>{{getFirstRecomendation.avg_coust_living_price}}</li>
            <li>{{getFirstRecomendation.avg_price}}</li>
            <li>{{getFirstRecomendation.business_accessibility}}</li>
            <li>{{getFirstRecomendation.recreation_rate}}</li>
          </ul>
        </div>
        <div class="recomendation-button">
          <input class="btn btn-outline-secondary" type="submit" value="Voltar" @click="comeBack">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeader from './TitleHeader.vue';
import BackendService from '@/service/backendService';
import FormQuestion from './FormQuestion.vue';
import Question from '@/model/AnsweredQuestion';
import Recomendation from '@/model/Recomendation';

export default {
  name: 'home-page',
  components: { TitleHeader, FormQuestion },
  computed: {
    getFirstRecomendation() {
      return this.recomendation;
    }
  },
  data() {
    return {
      isFormVisible: true,
      isLoading: false,
      service: new BackendService(),
      questions: [],
      recomendations: [],
      recomendation: null,
    }
  },
  mounted() {
    this.service.getQuestions().then(res => {
      this.questions = res.data.map(textQuestion => new Question(textQuestion))
    });
    this.$refs.instructionsModal.open();
  },
  methods: {
    updateQuestion(updatedQuestion, index) {
      this.questions[index] = updatedQuestion;
    },
    getRecomendation() {
      this.isLoading = true;
      let answeredQuestions = this.questions.filter(question => question.answer)
      if (answeredQuestions.length == 0) return;
      this.service.getRecomendation(answeredQuestions).then(res => {
        this.recomendations = res.data.map(cityInfo => new Recomendation(cityInfo));
        this.recomendation = this.recomendations.length > 0 ? this.recomendations[0]: undefined;
        console.log(this.recomendation)
        this.isLoading = false;
      });
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
.recomendation-button {
  margin-top: 10px;
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
  max-width: 400px;
  flex-wrap: wrap;
}
</style>
