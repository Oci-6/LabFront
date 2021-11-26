import { Institucion } from "./Institucion";

export class Edificio {

    id?: string | undefined;
    nombre?: string | undefined;
    latitud?: number | undefined;
    longitud?: number | undefined;

    tenantInstitucionId?: string | undefined;
    tenantInstitucion?: Institucion | undefined;

    constructor(init?: Partial<Edificio>) {
        Object.assign(this, init);
    }
}