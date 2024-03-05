import axios from "axios";

export default class BackendService {
    constructor() {
        this.url = 'http://127.0.0.1:5000/info-api'
    }
    
    getCities(uf) {
        return axios.get(`${this.url}/state/${uf}`)
    }

    getRecomendation(formAnswers) {
        return axios.post(`${this.url}/city/recomendation`, formAnswers)
    }
}