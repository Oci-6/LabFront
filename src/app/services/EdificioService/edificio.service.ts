import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Edificio } from 'src/app/models/Edificio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EdificioService {

  constructor(private http: HttpClient) { }

  private URL = environment.apiURL+'Edificio';

  post(data: Edificio) {
    return this.http.post<Edificio>(this.URL + `/`, data);
  }

  get(id: string) {
    return this.http.get<Edificio>(this.URL + `/${id}`);
  }

  getAll() {
    return this.http.get<Edificio[]>(this.URL + `/`);
  }
  
  put(data:Edificio, id:string) {
    return this.http.put(this.URL + `/${id}`,data);
  }
  delete(id:string) {
    return this.http.delete(this.URL + `/${id}`);
  }
}
