import { Factura } from "./Factura";

export class Pago {
    id?: string | undefined;
    monto?: number | undefined;

    facturaId?: string | undefined;
    factura?: Factura | undefined;

    creadoEn?: Date | undefined;

    constructor(init?: Partial<Pago>) {
        Object.assign(this, init);
    }
}