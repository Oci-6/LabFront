import { Precio } from "./Precio";

export class Producto {

    id?: string | undefined;
    nombre?: string | undefined;
    cantMaxEdificios?: number | undefined;
    cantMaxSalones?: number | undefined;
    precios?: Precio[] | undefined;

    constructor(init?: Partial<Producto>) {
        Object.assign(this, init);
    }
}