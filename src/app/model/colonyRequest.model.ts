export class ColonyRequestModel{

    id:number;

    cats: number;

    register: boolean;

    lng: number;

    lat: number;



    constructor(cats:number,register:boolean,
        lng:number,lat:number){
        this.cats=cats;
        this.register = register;
        this.lng=lng;
        this.lat=lat;
    }



}