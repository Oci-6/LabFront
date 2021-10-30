import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalEventsManager } from 'src/app/helpers/GlobalEventsManager';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnChanges {

  constructor(
    public authService: AuthService,
  ) { }

  items: { label: string, routerLink: string }[] = [];

  @Input()
  auth: any | undefined;
  ngOnChanges(): void {

      if (this.auth && this.auth.roles) {

        if (this.auth.roles.find((element: string) => element == 'SuperAdmin')) {
          this.items = [
            { label: "Instituciones", routerLink: "/instituciones" },
            { label: "Admin", routerLink: "/admins" },
          ];
        }
        if (this.auth.roles.find((element: string) => element =='Admin')) {
          this.items = [
            { label: "Mi institución", routerLink: "/home" },
            { label: "Gestores", routerLink: "/home/gestores" },
            { label: "Porteros", routerLink: "/home/porteros" },
          ];
        }

      } else {
        this.items = [];
      }
    





  }

}
