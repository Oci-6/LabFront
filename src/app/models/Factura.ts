import { Pago } from "./Pago";

export class Factura {
    id?: string | undefined;
    fecha_Vencimiento?: Date | undefined;
    importe?: number | undefined;
    descripcion?: string | undefined;

    pago?: Pago | undefined;

    constructor(init?: Partial<Factura>) {
        Object.assign(this, init);
    }
}