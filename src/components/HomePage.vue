<template>
  <div>
    <title-header />
    <div v-if="isFormVisible">
      <form>
        
      </form>
    </div>
  </div>
</template>

<script>
import TitleHeader from './TitleHeader.vue';
import BackendService from '@/service/backendService';
import Question from '@/model/Questions';
import Question from './Question.vue';

export default {
  name: 'home-page',
  components: { TitleHeader, Question },
  mounted(){
    console.log('INICIANDO');
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
</style>@/static/textQuestions
