import { Institucion } from "./Institucion";

export class Persona {
    id?: string | undefined;
    email?: string | undefined;
    tipoDocumento?: string | undefined;
    documento?: string | undefined;
    nombre?: string | undefined;
    apellido?: string | undefined;
    telefono?: string | undefined;

    tenantInstitucionId?: string | undefined;
    tenantInstitucion?: Institucion | undefined;

    constructor(init?: Partial<Persona>) {
        Object.assign(this, init);
    }


}