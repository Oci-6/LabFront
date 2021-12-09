import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pago } from 'src/app/models/Pago';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http: HttpClient) { }

  private URL = environment.apiURL+'Pago';

  getPagos(idFactura : string) {
    return this.http.get<Pago[]>(this.URL+ `/${idFactura}`);
  }

  get(id: string) {
    return this.http.get<Pago>(this.URL + `/${id}`);
  }

  put(data:Pago, id:string) {
    return this.http.put(this.URL + `/${id}`, data);
  }
  
  delete(id:string) {
    return this.http.delete(this.URL + `/${id}`);
  }

  pagar(idFactura : string | undefined){
    return this.http.get<any>(this.URL+ `/Pagar/${idFactura}`);
  }
  
}