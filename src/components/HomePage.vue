<template>
  <div>
    <title-header />
    <div v-if="isFormVisible">
      <form>
        <div v-for="(question, i) in questions" :key="i">
          <form-question :question="question" @update:question="updateQuestion($event, i)" />
        </div>
      </form>
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
    console.log('INICIANDO');
    this.service.getCities('RJ').then(res => {
      this.cities = res.data;
    });
    this.questions = text_questions;
    console.log(this.questions)
  },
  methods: {
    updateQuestion(updatedQuestion, index) {
      this.questions[index] = updatedQuestion;
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
