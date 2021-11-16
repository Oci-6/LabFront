import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private URL = environment.apiURL+'Persona';

  constructor(
    private http: HttpClient
  ) {}

    post(data: FormData) {
      return this.http.post<Usuario>(this.URL + `/`, data);
    }
    
    reconocer(data: FormData){
      return this.http.post<Usuario>(this.URL + `/Reconocer`, data);
    }
  
    importar(data: FormData){
      return this.http.post<Usuario>(this.URL + `/Importar`, data);
    }

    get(id: string) {
      return this.http.get<Usuario>(this.URL + `/${id}`);
    }
  
    getAll() {
      return this.http.get<Usuario[]>(this.URL + `/`);
    }
    
    put(data:Usuario, id:string) {
      return this.http.put(this.URL + `/${id}`,data);
    }
    delete(id:string) {
      return this.http.delete(this.URL + `/${id}`);
    }
}
