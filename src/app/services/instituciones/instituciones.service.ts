import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Institucion } from 'src/app/models/Institucion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {

  constructor(private http: HttpClient) { }

  private URL = environment.apiURL+'Institucion';

  post(data: Institucion) {
    return this.http.post<Institucion>(this.URL + `/`, data);
  }

  get(id: string) {
    return this.http.get<Institucion>(this.URL + `/${id}`);
  }

  getAll() {
    return this.http.get<Institucion[]>(this.URL + `/`);
  }
  
  put(data:Institucion, id:string) {
    return this.http.put(this.URL + `/${id}`,data);
  }
  delete(id:string) {
    return this.http.delete(this.URL + `/${id}`);
  }
  
}
