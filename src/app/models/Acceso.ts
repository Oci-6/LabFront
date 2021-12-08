import { Persona } from "./Persona";

export class Acceso {

    id?: string | undefined;
    edificioId?: string | undefined;
    personaId?: string | undefined;
    persona?: Persona | undefined;
    creadoEn?: Date | undefined;


    constructor(init?: Partial<Acceso>) {
        Object.assign(this, init);
    }
}