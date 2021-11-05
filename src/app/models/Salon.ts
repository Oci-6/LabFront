import { Edificio } from "./Edificio";

export class Salon {

    id?: string | undefined;
    nombre?: string | undefined;

    edificioId?: string | undefined;
    edificio?: Edificio | undefined;

    constructor(init?: Partial<Salon>) {
        Object.assign(this, init);
    }

}