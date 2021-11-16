import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './components/admins/admins.component';
import { AgregarNovedadComponent } from './components/tenant/edificio/novedades/agregar-novedad/agregar-novedad.component';
import { EdificiosComponent } from './components/tenant/edificio/edificios/edificios.component';
import { InstitucionesComponent } from './components/instituciones/instituciones.component';
import { ListaNovedadesComponent } from './components/tenant/edificio/novedades/lista-novedades/lista-novedades.component';
import { LoginComponent } from './components/login/login.component';
import { AccesoComponent } from './components/tenant/acceso/acceso.component';
import { PuertasComponent } from './components/tenant/edificio/puertas/puertas.component';
import { SalonesComponent } from './components/tenant/edificio/salones/salones.component';
import { GestoresComponent } from './components/tenant/gestores/gestores.component';
import { HomeTenantComponent } from './components/tenant/home-tenant/home-tenant.component';
import { PersonasComponent } from './components/tenant/personas/personas.component';
import { PorterosComponent } from './components/tenant/porteros/porteros.component';
import { ModificarNovedadComponent } from './components/tenant/edificio/novedades/modificar-novedad/modificar-novedad.component';
import { DetalleNovedadComponent } from './components/tenant/edificio/novedades/detalle-novedad/detalle-novedad.component';
import { ProductosComponent } from './components/tenant/productos/productos.component';

const routes: Routes = [

  { path: "", component: InstitucionesComponent },
  { path: "login", component: LoginComponent },
  { path: "admins", component: AdminsComponent },
  { path: 'productos', component: ProductosComponent },
  {
    path: ":tenant", component: HomeTenantComponent, children: [
      {
        path: 'gestores', component: GestoresComponent
      },
      {
        path: 'porteros', component: PorterosComponent
      },
      {
        path: 'personas', component: PersonasComponent
      },
      {
        path: 'edificios', component: EdificiosComponent
      },
      {
        path: 'edificios/:idEdificio/acceso', component: AccesoComponent
      },
      {
        path: 'edificios/salones/:id', component: SalonesComponent
      },
      {
        path: 'edificios/puertas/:id', component: PuertasComponent
      },
      {
        path: 'edificios/novedades/:id', component: ListaNovedadesComponent
      },
      {
        path: 'edificios/agregar-novedad/:idEdificio', component: AgregarNovedadComponent
      },
      {
        path: 'edificios/modificar-novedad/:idNovedad', component: ModificarNovedadComponent
      },
      {
        path: 'edificios/detalle-novedad/:idNovedad', component: DetalleNovedadComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
