import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { InstitucionesComponent } from './components/instituciones/instituciones.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminsComponent } from './components/admins/admins.component';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { HomeTenantComponent } from './components/tenant/home-tenant/home-tenant.component';
import { InstitucionInterceptor } from './services/instituciones/institucion.interceptor';
import { PorterosComponent } from './components/tenant/porteros/porteros.component';
import { ToastsComponent } from './partials/toasts/toasts.component';
import { EdificiosComponent } from './components/tenant/edificio/edificios/edificios.component';
import { GestoresComponent } from './components/tenant/gestores/gestores.component';
import { PersonasComponent } from './components/tenant/personas/personas.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { AccesoComponent } from './components/tenant/acceso/acceso.component';
import { WebcamModule } from 'ngx-webcam';
import { SalonesComponent } from './components/tenant/edificio/salones/salones.component';
import { PuertasComponent } from './components/tenant/edificio/puertas/puertas.component';
import { ListaNovedadesComponent } from './components/tenant/edificio/novedades/lista-novedades/lista-novedades.component';
import { AgregarNovedadComponent } from './components/tenant/edificio/novedades/agregar-novedad/agregar-novedad.component';
import { ModificarNovedadComponent } from './components/tenant/edificio/novedades/modificar-novedad/modificar-novedad.component';
import { DetalleNovedadComponent } from './components/tenant/edificio/novedades/detalle-novedad/detalle-novedad.component';
import { ProductosComponent } from './components/tenant/productos/productos.component';
import { PreciosComponent } from './components/tenant/precios/precios.component';
import { EventosComponent } from './components/tenant/edificio/eventos/eventos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interaction from '@fullcalendar/interaction';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interaction
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    InstitucionesComponent,
    AdminsComponent,
    HomeTenantComponent,
    PorterosComponent,
    ToastsComponent,
    EdificiosComponent,
    GestoresComponent,
    SidebarComponent,
    PersonasComponent,
    SalonesComponent,
    PuertasComponent,
    AccesoComponent,
    ListaNovedadesComponent,
    AgregarNovedadComponent,
    ModificarNovedadComponent,
    DetalleNovedadComponent,
    ProductosComponent,
    PreciosComponent,
    EventosComponent,
  ],
  imports: [
    WebcamModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule, 
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FullCalendarModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InstitucionInterceptor, multi: true },
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
