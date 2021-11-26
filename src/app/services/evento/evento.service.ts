import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from 'src/app/models/Evento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private URL = environment.apiURL+'Evento';

  constructor(
    private http: HttpClient
  ) {}

    post(data: Evento) {
      return this.http.post<Evento>(this.URL + `/`, data);
    }
  
    get(id: string) {
      return this.http.get<Evento>(this.URL + `/${id}`);
    }
  
    getAll() {
      return this.http.get<Evento[]>(this.URL + `/`);
    }
    
    put(data:Evento, id:string) {
      return this.http.put(this.URL + `/${id}`,data);
    }
    delete(id:string) {
      return this.http.delete(this.URL + `/${id}`);
    }
}
