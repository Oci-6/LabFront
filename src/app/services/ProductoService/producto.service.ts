import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  private URL = environment.apiURL+'Producto';

  post(data: Producto) {
    return this.http.post<Producto>(this.URL + `/`, data);
  }

  getProductos() {
    return this.http.get<Producto[]>(this.URL);
  }

  get(id: string) {
    return this.http.get<Producto>(this.URL + `/${id}`);
  }

  put(data:Producto, id:string) {
    return this.http.put(this.URL + `/${id}`, data);
  }
  
  delete(id:string) {
    return this.http.delete(this.URL + `/${id}`);
  }
}
