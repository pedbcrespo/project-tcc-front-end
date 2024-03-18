export default class Recomendation {
    constructor(recomendationResult) {
        this.id = recomendationResult? recomendationResult.id : null;
        this.name = recomendationResult? recomendationResult.name : null;
        this.idh = recomendationResult? recomendationResult.idh : null;
        this.recreation_rate = recomendationResult? recomendationResult.recreation_rate : null;
        this.business_accessibility = recomendationResult? recomendationResult.business_accessibility : null;
        this.avg_price = recomendationResult? recomendationResult.avg_price : null;
        this.avg_coust_living_price = recomendationResult? recomendationResult.avg_avg_coust_living_priceprice : null;
        this.enterprises_amount = recomendationResult? recomendationResult.enterprises_amount : null;
        this.enterprisesmost_current_type_enterprises_amount = recomendationResult? recomendationResult.enterprises_amount : null;
    }
}