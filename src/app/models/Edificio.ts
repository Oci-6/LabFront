import { Institucion } from "./Institucion";

export class Edificio {

    id?: string | undefined;
    latitud?: string | undefined;
    longitud?: string | undefined;

    tenantInstitucionId?: string | undefined;
    tenantInstitucion?: Institucion | undefined;

    constructor(init?: Partial<Edificio>) {
        Object.assign(this, init);
    }
}