export class ColoniaRequestModel{

    numGatos: number;

    registro: boolean;

    longitud: number;

    latitud: number;


    constructor(numGatos:number,registro:boolean,
        longitud:number,latitud:number){
        this.numGatos=numGatos;
        this.registro = true;
        this.longitud=longitud;
        this.latitud=latitud;
    }


}