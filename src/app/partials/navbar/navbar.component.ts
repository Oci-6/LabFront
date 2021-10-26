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
    private route: ActivatedRoute,
    private router: Router,
    public authService : AuthService
  ) { }

  items: { label: string, routerLink: string }[] = [];
  brand: string | null = "App";
  auth: string | null | undefined;
  ngOnInit(): void {

    this.auth = localStorage.getItem("auth");
    let auth:any = (typeof this.auth === "string") ? JSON.parse(this.auth) : undefined;

    if (auth && auth.roles) {

      if (auth.roles.includes('SuperAdmin')) {
        this.items = [
          { label: "Instituciones", routerLink: "/instituciones" },
          { label: "Admin", routerLink: "/admins" },
        ];
      }

    }

    // this.router.events.subscribe((val) => {
    //   let tenant = this.route.snapshot.parent?.children.find((e) => e.outlet === "primary")?.paramMap.get('tenant');
    //   this.brand = (tenant != null) ? tenant : this.brand;
    //   console.log(tenant);
      
    // });

  }

}
