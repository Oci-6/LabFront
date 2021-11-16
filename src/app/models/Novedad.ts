export class Novedad{

    
    id?: string | undefined;

    titulo?: string | undefined;

    contenido?: string | undefined;

    imagen?: string | undefined;
  
    creadoEn?: Date | undefined;

    edificioId?: string | undefined;

    constructor(init?: Partial<Novedad>) {
        Object.assign(this, init);
    }
}