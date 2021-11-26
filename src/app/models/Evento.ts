import { Salon } from "./Salon";

export class Evento {

    id?: string | undefined;
    nombre?: string | undefined;
    fechaInicio?: Date | undefined;
    fechaFin?: Date | undefined;
    horaInicio?: any | undefined;
    horaFin?: any | undefined;

    semanalmente?: boolean | undefined;
    mensualmente?: boolean | undefined;
    lunes?: boolean | undefined;
    martes?: boolean | undefined;
    miercoles?: boolean | undefined;
    jueves?: boolean | undefined;
    viernes?: boolean | undefined;
    sabado?: boolean | undefined;
    domingo?: boolean | undefined;

    salonId?: string | undefined;
    salon?: Salon | undefined;

    constructor(init?: Partial<Evento>) {
        Object.assign(this, init);
    }
}