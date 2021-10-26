export class ColoniaModel{
    id:number;

    numGatos: number;

    registro: boolean;

    longitud: number;

    latitud: number;

    direccion: string[];


    constructor(id:number,numGatos:number,registro:boolean,
        longitud:number,latitud:number, direccion: string[]){
        this.id = id;
        this.numGatos=numGatos;
        this.registro = true;
        this.longitud=longitud;
        this.latitud=latitud;
        this.direccion=direccion;
    }


}