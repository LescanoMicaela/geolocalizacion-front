export class ColoniaModel{
    id:number;

    numGatos: number;

    registro: boolean;

    longitud: number;

    latitud: number;


    constructor(id:number,numGatos:number,registro:boolean,
        longitud:number,latitud:number){
        this.id = id;
        this.numGatos=numGatos;
        this.registro = true;
        this.longitud=longitud;
        this.latitud=latitud;
    }
}