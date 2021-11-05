import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './components/admins/admins.component';
import { InstitucionesComponent } from './components/instituciones/instituciones.component';
import { LoginComponent } from './components/login/login.component';
import { GestoresComponent } from './components/tenant/gestores/gestores.component';
import { HomeTenantComponent } from './components/tenant/home-tenant/home-tenant.component';
import { PersonasComponent } from './components/tenant/personas/personas.component';
import { PorterosComponent } from './components/tenant/porteros/porteros.component';

const routes: Routes = [

  { path: "", component: InstitucionesComponent },
  { path: "login", component: LoginComponent },
  { path: "admins", component: AdminsComponent },
  {
    path: ":tenant", component: HomeTenantComponent,  children: [
      {
        path: 'gestores', component: GestoresComponent
      },
      {
        path: 'porteros', component: PorterosComponent
      },
      {
        path: 'personas', component: PersonasComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
