import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asignacion } from 'src/app/models/Asignacion';
import { Puerta } from 'src/app/models/Puerta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  constructor(private http: HttpClient) { }

  private URL = environment.apiURL+'AsignacionPuerta';

  post(data: Asignacion) {
    return this.http.post<Asignacion>(this.URL + `/`, data);
  }

  get(id: string) {
    return this.http.get<Asignacion>(this.URL + `/${id}`);
  }

  getActual() {
    return this.http.get<Puerta>(this.URL);
  }

  desAsignar() {
    return this.http.put(this.URL, {});
  }
  getAsignacionesEdificio(id: string, page?: string, take?: string) {
    let urlSearchParams = new URLSearchParams({
      page: page ?? '1',
      take: take ?? '10'
    })

    return this.http.get<{
      pageIndex: number,
      totalPages: number,
      items: []
    }>(this.URL+ `/Edificio/${id}?`+urlSearchParams);
  }
  
  put(data:Asignacion, id:string) {
    return this.http.put(this.URL + `/${id}`, data);
  }
  
  delete(id:string) {
    return this.http.delete(this.URL + `/${id}`);
  }
}
