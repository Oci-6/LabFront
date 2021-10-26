import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
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
          if(response.roles.includes("SuperAdmin")){
            this.router.navigate(['instituciones'])
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
