export class ColonyModel {
    id: number;
    cats: number;
    register: boolean;
    lng: number;
    lat: number;
    direction: string[];
    food: boolean;
    water: boolean;
    time: Date;


    constructor(id: number, cats: number, register: boolean,
        lng: number, lat: number, direction: string[],
        food: boolean, water: boolean, time: Date) {
        this.id = id;
        this.cats = cats;
        this.register = register;
        this.lng = lng;
        this.lat = lat;
        this.direction = direction;
        this.food = food;
        this.water = water;
        this.time = time;
    }


}