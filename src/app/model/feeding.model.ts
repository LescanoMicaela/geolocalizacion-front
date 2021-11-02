export class FeedingModel{

    waterAvailable: boolean;
    water: boolean;
    foodAvailable: boolean;
    food: boolean;


    constructor( 
        waterAvailable: boolean,
        water: boolean,
        foodAvailable: boolean,
        food: boolean,
        time: Date){
        this.waterAvailable = waterAvailable;
        this.water=water;
        this.foodAvailable = foodAvailable;
        this.food=food;
    }
}