export class Institucion {
    id?: string | undefined;
    rut?: string | undefined;
    razonSocial?: string | undefined;

    constructor(init?: Partial<Institucion>) {
        Object.assign(this, init);
    }
}