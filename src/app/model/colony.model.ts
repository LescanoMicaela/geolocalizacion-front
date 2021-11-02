export class ColonyModel{
    id:number;

    cats: number;

    register: boolean;

    lng: number;

    lat: number;

    direction: string[];


    constructor(id:number,cats:number,register:boolean,
        lng:number,lat:number, direction: string[]){
        this.id = id;
        this.cats=cats;
        this.register = register;
        this.lng=lng;
        this.lat=lat;
        this.direction=direction;
    }


}