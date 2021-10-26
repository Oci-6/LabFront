import { Institucion } from "./Institucion";

export class Usuario {
    id?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    tipoDocumento?: string | undefined;
    documento?: string | undefined;
    nombre?: string | undefined;
    apellido?: string | undefined;
    phoneNumber?: string | undefined;

    tenantInstitucionId?: string | undefined;
    tenantInstitucion?: Institucion | undefined;

    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init);
    }


}
