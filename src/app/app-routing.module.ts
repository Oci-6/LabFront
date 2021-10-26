import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './components/admins/admins.component';
import { HomeComponent } from './components/home/home.component';
import { InstitucionesComponent } from './components/instituciones/instituciones.component';
import { LoginComponent } from './components/login/login.component';
import { HomeTenantComponent } from './components/tenant/home-tenant/home-tenant.component';
import { PorterosComponent } from './components/tenant/porteros/porteros.component';
import { NavbarComponent } from './partials/navbar/navbar.component';

const routes: Routes = [
 
      { path: '', component: NavbarComponent ,outlet: "navbar",  pathMatch: 'prefix'},
      { path: "login", component: LoginComponent },
      { path: "instituciones", component: InstitucionesComponent },
      { path: "admins", component: AdminsComponent },
      {
        path: ":tenant",component: HomeTenantComponent, children: [
          { path: 'porteros', component: PorterosComponent
        },
        ]
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
