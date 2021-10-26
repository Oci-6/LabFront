import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor() { }

  setTenant(tenant: string){
    localStorage.setItem("tenant", tenant);
  }

  getTenant(){
    return localStorage.getItem("tenant");
  }

  deleteTenant(){
    localStorage.removeItem("tenant");
  }
}
