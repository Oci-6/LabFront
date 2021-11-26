
export class Precio {

    id?: string | undefined;
    monto?: number | undefined;
    fecha_Validez?: Date | undefined;
    productoId?: string | undefined;

    constructor(init?: Partial<Precio>) {
        Object.assign(this, init);
    }
}