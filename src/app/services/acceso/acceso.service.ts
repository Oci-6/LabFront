import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Acceso } from 'src/app/models/Acceso';
import { Usuario } from 'src/app/models/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private URL = environment.apiURL+'Acceso';

  constructor(
    private http: HttpClient
  ) {}

    reconocer(data: FormData) {
      return this.http.post<Usuario>(this.URL + `/Reconocer`, data);
    }
  
    getAll(idEdificio: string) {
      return this.http.get<Acceso[]>(this.URL + `/Edificio/`+idEdificio);
    }
    
    post(data: Acceso) {
      return this.http.post<Acceso>(this.URL + `/`, data);
    }
  
    get(id: string) {
      return this.http.get<Acceso>(this.URL + `/${id}`);
    }
  
    put(data:Acceso, id:string) {
      return this.http.put(this.URL + `/${id}`,data);
    }
    delete(id:string) {
      return this.http.delete(this.URL + `/${id}`);
    }
}
