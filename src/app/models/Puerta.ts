import { Edificio } from "./Edificio";
import { Usuario } from "./Usuario";

export class Puerta {

    id?: string | undefined;
    nombre?: string | undefined;

    edificioId?: string | undefined;
    edificio?: Edificio | undefined;

    usuarioId?: string | undefined;
    usuario?: Usuario | undefined;

    constructor(init?: Partial<Puerta>) {
        Object.assign(this, init);
    }
}