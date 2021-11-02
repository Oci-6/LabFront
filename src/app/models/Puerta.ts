import { Edificio } from "./Edificio";

export class Puerta {

    id?: string | undefined;
    nombre?: string | undefined;

    edificioId?: string | undefined;
    edificio?: Edificio | undefined;

    constructor(init?: Partial<Puerta>) {
        Object.assign(this, init);
    }
}