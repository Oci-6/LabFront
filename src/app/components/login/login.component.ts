import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalEventsManager } from 'src/app/helpers/GlobalEventsManager';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private tenantService: TenantService,
    private globalEventsManager: GlobalEventsManager
  ) { }
  
  iniciarSesionForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required),
  });

  ngOnInit(): void {
  }

  onSubmit(){

    if(this.iniciarSesionForm.valid){

      let user = new Usuario(this.iniciarSesionForm.value);

      this.authService.logIn(user).subscribe(
        response => {
          
          localStorage.setItem("auth", JSON.stringify(response));
          this.globalEventsManager.updateNavbar.emit(true);

          if(response.roles.includes("SuperAdmin")){
            this.router.navigateByUrl('/');
          }
          else{
            this.router.navigateByUrl('/'+response.usuario.tenantInstitucionId);
            this.tenantService.setTenant(response.usuario.tenantInstitucionId);
          }
        },
        error => {
          console.error(error);
        }
      )

       
      
      console.log(user);
      
    }
  }
}
