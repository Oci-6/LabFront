export class Institucion {
    id?: string | undefined;
    rut?: string | undefined;
    razonSocial?: string | undefined;
    productoId?: string | undefined;

    constructor(init?: Partial<Institucion>) {
        Object.assign(this, init);
    }
}