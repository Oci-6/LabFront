import { Usuario } from "./Usuario";
import { Puerta } from "./Puerta";

export class Asignacion {

    id?: string | undefined;
    puertaId?: string | undefined;
    puerta?: Puerta | undefined;

    usuarioId?: string | undefined;
    usuario?: Usuario | undefined;
    creadoEn?: Date | undefined;


    constructor(init?: Partial<Asignacion>) {
        Object.assign(this, init);
    }
}