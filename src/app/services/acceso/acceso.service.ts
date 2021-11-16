import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    post(data: FormData) {
      return this.http.post<Usuario>(this.URL + `/`, data);
    }
  
    getAll(idEdificio: string) {
      return this.http.get<Usuario[]>(this.URL + `/`+idEdificio);
    }
}
