import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Puerta } from 'src/app/models/Puerta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuertaService {

  constructor(private http: HttpClient) { }

  private URL = environment.apiURL+'Puerta';

  post(data: Puerta) {
    return this.http.post<Puerta>(this.URL + `/`, data);
  }

  get(id: string) {
    return this.http.get<Puerta>(this.URL + `/${id}`);
  }

  getPuertasEdificio(id: string) {
    return this.http.get<Puerta[]>(this.URL + `/Edificio` + `/${id}`);
  }
  
  put(data:Puerta, id:string) {
    return this.http.put(this.URL + `/${id}`, data);
  }
  
  delete(id:string) {
    return this.http.delete(this.URL + `/${id}`);
  }
}
