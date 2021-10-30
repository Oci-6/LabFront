import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { InstitucionesComponent } from './components/instituciones/instituciones.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminsComponent } from './components/admins/admins.component';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { HomeTenantComponent } from './components/tenant/home-tenant/home-tenant.component';
import { InstitucionInterceptor } from './services/instituciones/institucion.interceptor';
import { PorterosComponent } from './components/tenant/porteros/porteros.component';
import { HomeComponent } from './components/home/home.component';
import { ToastsComponent } from './partials/toasts/toasts.component';
import { EdificiosComponent } from './components/edificios/edificios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    InstitucionesComponent,
    AdminsComponent,
    HomeTenantComponent,
    PorterosComponent,
    HomeComponent,
    ToastsComponent,
    EdificiosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, 
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InstitucionInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
