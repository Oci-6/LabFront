import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Novedad } from 'src/app/models/Novedad';
import { Puerta } from 'src/app/models/Puerta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  constructor(private http: HttpClient) { }

  private URL = environment.apiURL+'Novedad';

  post(data: FormData) {
    return this.http.post<Novedad>(this.URL + `/`, data);
  }

  get(id: string) {
    return this.http.get<Novedad>(this.URL + `/${id}`);
  }

  getNovedadesEdificio(id: string) {
    return this.http.get<Novedad[]>(this.URL + `/Edificio` + `/${id}`);
  }
  
  getUltimas(){
    return this.http.get<Novedad[]>(this.URL + `/Ultimas`);
  }

  put(data:FormData, id:string | undefined) {
    return this.http.put(this.URL + `/${id}`, data);
  }
  
  delete(id:string) {
    return this.http.delete(this.URL + `/${id}`);
  }
}
