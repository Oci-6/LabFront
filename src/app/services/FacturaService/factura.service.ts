import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from 'src/app/models/Factura';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  private URL = environment.apiURL+'Factura';

  getFacturas() {
    return this.http.get<Factura[]>(this.URL);
  }

  get(id: string) {
    return this.http.get<Factura>(this.URL + `/${id}`);
  }

  put(data:Factura, id:string) {
    return this.http.put(this.URL + `/${id}`, data);
  }
  
  delete(id:string) {
    return this.http.delete(this.URL + `/${id}`);
  }
  
}
