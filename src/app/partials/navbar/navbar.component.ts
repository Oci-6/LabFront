import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  items: { label: string, routerLink: string }[] = [];

  auth: any | undefined;
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.auth = this.authService.getAuth();

        if (this.auth && this.auth.roles) {
  
          if (this.auth.roles.find((element: string) => element == 'SuperAdmin')) {
            this.items = [
              { label: "Instituciones", routerLink: "/instituciones" },
              { label: "Admin", routerLink: "/admins" },
            ];
          }
          if (this.auth.roles.find((element: string) => element =='Admin')) {
            this.items = [
              // { label: "Mi institución", routerLink: "/"+this.auth.usuario.tenantInstitucionId },
              { label: "Gestores", routerLink: "/"+this.auth.usuario.tenantInstitucionId+"/gestores" },
              { label: "Porteros", routerLink: "/"+this.auth.usuario.tenantInstitucionId+"/porteros" },
            ];
          }
  
        } else {
          this.items = [];
        }      }
    })

   
    





  }

}
