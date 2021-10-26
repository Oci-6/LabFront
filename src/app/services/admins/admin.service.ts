import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private URL = environment.apiURL+'Admin';

  constructor(
    private http: HttpClient
  ) {}

    post(data: Usuario) {
      return this.http.post<Usuario>(this.URL + `/`, data);
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
