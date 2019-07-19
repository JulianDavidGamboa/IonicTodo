import { listaItem } from './lista-item.model';


export class Lista {

    id: number;
    titulo: string;
    creadaEn: Date;
    terminadaEn: Date;
    terminada: boolean;
    items: listaItem[];

    constructor ( titulo: string ) {

        this.titulo = titulo;
        this.creadaEn = new Date();
        this.terminada = false;
        this.items = [];

        this.id = new Date().getTime();

    }

}