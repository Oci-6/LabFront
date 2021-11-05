import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InstitucionesService } from 'src/app/services/instituciones/instituciones.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-home-tenant',
  templateUrl: './home-tenant.component.html',
  styleUrls: ['./home-tenant.component.css']
})
export class HomeTenantComponent implements OnInit , OnDestroy {

  isCollapsed: boolean = false;
  items: {label: string, routerLink: any}[] = [
    {label: "Home", routerLink: ""},
    {label: "Novedades", routerLink: ""},
    {label: "Edificios", routerLink: ""},
    {label: "Eventos", routerLink: ""},
  ];

  tenant: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private institucionService: InstitucionesService,
    private tenantService: TenantService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    let tenant = this.route.snapshot.params['tenant'];

    if (tenant) {

      this.institucionService.get(tenant).subscribe(
        (response) => { 
          this.tenantService.deleteTenant();
          this.tenantService.setTenant(tenant);
        },
        (error) => {
          this.toastService.showError("No existe institución");
          this.router.navigate(['']);
        }
      );

        let auth = this.authService.getAuth();

        if(auth&&auth.roles.find((element: string) => element =='Admin')&&auth.usuario.tenantInstitucionId == tenant){
          this.items.push({label:"Porteros", routerLink: "porteros"});
          this.items.push({label:"Gestores", routerLink: "gestores"});
        }
        if(auth&&auth.roles.find((element: string) => element =='Portero'||element == 'Gestor')&&auth.usuario.tenantInstitucionId == tenant){
          this.items.push({label:"Personas", routerLink: "personas"});
        }
    }

  }

  ngOnDestroy(){
    this.tenantService.deleteTenant();
  }

}
