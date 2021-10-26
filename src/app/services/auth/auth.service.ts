import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router) { }

  private URL = environment.apiURL+'Login';

  logIn(data: Usuario) {
    return this.http.post<any>(this.URL + '/', data);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/'])
  }
  
  getAuth(){
    let auth = localStorage.getItem("auth");
    if(auth&&typeof auth === 'string'){
       
       return JSON.parse(auth);
    }

    return auth;//undefined
  }
}
