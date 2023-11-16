import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { VacaComponent } from './vaca/vaca.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './users/login.component';

import { FormsModule } from '@angular/forms';
import { FincaComponent } from './finca/finca.component';
import { VacunaComponent } from './vacuna/vacuna.component';

import { FormVacaComponent } from './vaca/form-vaca/form-vaca.component';
import { FormVacunaComponent } from './vacuna/form-vacuna/form-vacuna.component';
import { TrabajadorComponent } from './trabajador/trabajador.component';
import { FormTrabajadorComponent } from './trabajador/form-trabajador/form-trabajador.component';
import { ProduccionComponent } from './produccion/produccion.component';
import { FormProduccionComponent } from './produccion/form-produccion/form-produccion.component';
import { VacunacionComponent } from './vacunacion/vacunacion.component';
import { FormVacunacionComponent } from './vacunacion/form-vacunacion/form-vacunacion.component';
import { VentaComponent } from './venta/venta.component';
import { FormVentaComponent } from './venta/form-venta/form-venta.component';
import { TokenInterceptor } from './users/interceptors/token.interceptor';
import { AuthInterceptor } from './users/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    VacaComponent,
    HomeComponent,
    LoginComponent,
  
    FincaComponent,
    VacunaComponent,
    FormVacaComponent,
    FormVacunaComponent,
    TrabajadorComponent,
    FormTrabajadorComponent,
   
    ProduccionComponent,
    FormProduccionComponent,
    VacunacionComponent,
    FormVacunacionComponent,
    VentaComponent,
    FormVentaComponent,

   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],

  bootstrap: [AppComponent]
})
export class AppModule { }
