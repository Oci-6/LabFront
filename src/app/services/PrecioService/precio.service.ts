import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Precio } from 'src/app/models/Precio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrecioService {

  constructor(private http: HttpClient) { }

  private URL = environment.apiURL+'Precio';

  post(data: Precio) {
    return this.http.post<Precio>(this.URL + `/`, data);
  }

  getPreciosProducto(id: string) {
    return this.http.get<Precio[]>(this.URL + `/Producto` + `/${id}`);
  }

  get(id: string) {
    return this.http.get<Precio>(this.URL + `/${id}`);
  }

  put(data:Precio, id:string) {
    return this.http.put(this.URL + `/${id}`, data);
  }
  
  delete(id:string) {
    return this.http.delete(this.URL + `/${id}`);
  }
}
