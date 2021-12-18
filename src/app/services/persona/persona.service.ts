import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private URL = environment.apiURL + 'Persona';

  constructor(
    private http: HttpClient
  ) { }

  post(data: FormData) {
    return this.http.post<Persona>(this.URL + `/`, data);
  }

  reconocer(data: FormData) {
    return this.http.post<Persona>(this.URL + `/Reconocer`, data);
  }

  importar(data: FormData) {
    return this.http.post<Persona>(this.URL + `/Importar`, data);
  }

  get(id: string) {
    return this.http.get<Persona>(this.URL + `/${id}`);
  }

  getAll() {
    return this.http.get<Persona[]>(this.URL + `/`);
  }

  search(query?: string, page?: string, take?: string) {

    let urlSearchParams = new URLSearchParams({
      page: page ?? '1',
      query: query ?? ''
    })

    return this.http.get<{
      pageIndex: number,
      totalPages: number,
      items: []
    }>(this.URL+ `/Buscar?`+urlSearchParams);
    }

  put(data: Persona, id: string) {
    return this.http.put(this.URL + `/${id}`, data);
  }
  delete(id: string) {
    return this.http.delete(this.URL + `/${id}`);
  }
}
