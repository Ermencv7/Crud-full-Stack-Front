import { Time } from "@angular/common";

export class Venta {

    id: number;
    producto: string;
	fecha:Date;
	hora:Time;
	cantidad:number;
	valorUnitario:number;
    valorTotal:number;
}