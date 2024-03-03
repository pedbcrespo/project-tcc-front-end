<template>
  <div>
    <title-header />
    <div v-if="isFormVisible">
      <form>
        <div v-for=" question in questions" class="form-check form-check-inline" :key="question.id">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="question.answer">
          <label class="form-check-label" for="inlineRadio1"> {{question.description}} </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TitleHeader from './TitleHeader.vue';
import BackendService from '@/service/backendService';
import questions from '@/static/questions';
import Question from '@/model/Questions';

export default {
  name: 'home-page',
  components: { TitleHeader },
  mounted(){
    console.log('INICIANDO')
    for(let i in questions) {
      questions.push(new Question(i, questions[i]))
    }
  },
  data() {
    return {
      isFormVisible: true,
      service: new BackendService(),
      questions: [],
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
