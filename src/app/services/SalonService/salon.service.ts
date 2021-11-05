import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Salon } from 'src/app/models/Salon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  constructor(private http: HttpClient) { }

  private URL = environment.apiURL+'Salon';

  post(data: Salon) {
    return this.http.post<Salon>(this.URL + `/`, data);
  }

  get(id: string) {
    return this.http.get<Salon>(this.URL + `/${id}`);
  }

  getSalonesEdificio(id: string) {
    return this.http.get<Salon[]>(this.URL + `/Edificio` + `/${id}`);
  }
  
  put(data:Salon, id:string) {
    return this.http.put(this.URL + `/${id}`, data);
  }
  
  delete(id:string) {
    return this.http.delete(this.URL + `/${id}`);
  }
}
