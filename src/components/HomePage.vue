<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">TCC</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            </div>
        </div>
    </nav>
    <div class="content">
      <div v-if="isFormVisible" class="container-form">
        <h2 class="title-form">Quiz</h2>
        <form class="form-ttt" @submit.prevent="getRecomendation">
          <div v-for="(question, i) in questions" :key="i">
            <form-question :question="question" @update:question="updateQuestion($event, i)" />
          </div>
          <input class="btn btn-outline-secondary" type="submit" value="Submit">
        </form>
      </div>
      <div class="city-recomended" v-else>
        <div v-if="isLoading" class="spinner-border" role="status">
          <span class="visually-hidden"></span>
        </div>
        <div v-else class="recomendation">
          <div v-if="recomendation">
            <h1 class="result"><b>{{ getFirstRecomendation.name }}</b>:</h1>
            <h2 class="attributes"><b>Atributos</b></h2>
            <ul class="info-city">
              <li><b>IDH:</b> {{ getFirstRecomendation.idh }}</li>
              <li><b>Custo de vida:</b> {{ getFirstRecomendation.avg_coust_living_price }}</li>
              <li><b>Custo médio dos imóveis:</b> {{ getFirstRecomendation.avg_price }}</li>
              <li><b>Acessibilidade de empresas:</b> {{ getFirstRecomendation.business_accessibility }}</li>
              <li><b>Indice de entreterimento:</b> {{ getFirstRecomendation.recreation_rate }}</li>
            </ul>
          </div>
          <div class="recomendation-button">
            <input class="btn btn-outline-secondary" type="submit" value="Voltar" @click="comeBack">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackendService from '@/service/backendService';
import FormQuestion from './FormQuestion.vue';
import Question from '@/model/AnsweredQuestion';
import Recomendation from '@/model/Recomendation';

export default {
  name: 'home-page',
  components: { FormQuestion },
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
        this.recomendation = this.recomendations.length > 0 ? this.recomendations[0] : undefined;
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
  font-weight: bold;
  font-size: 35pt;
}

.form-ttt {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  max-width: 500px;
  flex-wrap: wrap;
}

.container-form,
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content {
  margin-top: 3%;
}

.city-recomended {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
}

.recomendation {
  margin-top: 2%;
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border: 2px solid rgb(221, 221, 221);
  border-radius: 2%;
}

.result {
  margin-bottom: 10%;
  font-weight: bold;
  color: rgb(80, 80, 80);
  background-color: rgb(240, 239, 239);
  border-bottom: 1px solid rgb(221, 221, 221);
  display: flex;
  justify-content: center;
  width: fit-content;
  font-size: 20pt;
}

.attributes {
  color: rgb(80, 80, 80);
  font-size: 20pt;
  text-align: start;
  margin-left: 5%;
}

.info-city {
  text-align: start;
}

.recomendation-button {
  margin-bottom: 2%;
}
</style>
