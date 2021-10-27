export class AlimentacionModel{

    hayAgua: boolean;
    agua: boolean;
    hayComida: boolean;
    comida: boolean;


    constructor( 
        hayAgua: boolean,
        agua: boolean,
        hayComida: boolean,
        comida: boolean,
        fecha: Date){
        this.hayAgua = hayAgua;
        this.agua=agua;
        this.hayComida = hayComida;
        this.comida=comida;
    }
}