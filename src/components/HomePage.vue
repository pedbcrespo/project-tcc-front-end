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
// import StructQuestion from '@/model/StructQuestion';
// import FormQuestion from './FormQuestion.vue';

export default {
  name: 'home-page',
  components: { TitleHeader },
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
      console.log(this.cities);
    });
    this.getQuestions();
  },
  methods: {
    requestQuestions(callback) {
      const pathJsonFile = 'src/static/text_questions.json'     
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const json = JSON.parse(xhr.responseText);
          callback(null, json);
        } else if (xhr.readyState === 4) {
          callback(new Error('Erro ao ler o arquivo JSON'));
        }
      },
        xhr.open('GET', pathJsonFile, true);
      xhr.responseType = 'text';
      xhr.send();
    },
    getQuestions() {
      const callback = function(err, data) {
        if(err)
          console.error(err);
        else{
          console.log(data)
          return data;
        }
      } 
      this.requestQuestions(callback);
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
</style>@/static/textQuestions@/model/Question./FormQuestion.vue
