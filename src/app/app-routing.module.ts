import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FincaComponent } from './finca/finca.component';
import { HomeComponent } from './home/home.component';
import { FormProduccionComponent } from './produccion/form-produccion/form-produccion.component';
import { ProduccionComponent } from './produccion/produccion.component';


import { FormTrabajadorComponent } from './trabajador/form-trabajador/form-trabajador.component';
import { TrabajadorComponent } from './trabajador/trabajador.component';
import { LoginComponent } from './users/login.component';
import { FormVacaComponent } from './vaca/form-vaca/form-vaca.component';
import { VacaComponent } from './vaca/vaca.component';
import { FormVacunaComponent } from './vacuna/form-vacuna/form-vacuna.component';
import { VacunaComponent } from './vacuna/vacuna.component';
import { FormVacunacionComponent } from './vacunacion/form-vacunacion/form-vacunacion.component';
import { VacunacionComponent } from './vacunacion/vacunacion.component';
import { FormVentaComponent } from './venta/form-venta/form-venta.component';
import { VentaComponent } from './venta/venta.component';
import { AuthGuard } from './users/guards/auth.guard';
import { RoleGuard } from './users/guards/role.guard';


const routes: Routes = 
[
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'finca', component: FincaComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' , role2:'ROLE_VETERINARIO', role3:'ROLE_TRABAJADOR'}},
  {path: 'vacas', component: VacaComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' , role2:'ROLE_VETERINARIO', role3:'ROLE_TRABAJADOR'}},
  {path: 'vaca/form', component: FormVacaComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' , role2:'ROLE_VETERINARIO', role3:'ROLE_TRABAJADOR'}},
  {path: 'vaca/form/:id', component: FormVacaComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' , role2:'ROLE_VETERINARIO', role3:'ROLE_TRABAJADOR'}},
  {path: 'vacuna', component: VacunaComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN', role2:'ROLE_VETERINARIO' }},
  {path: 'vacuna/form', component: FormVacunaComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN', role2:'ROLE_VETERINARIO' }},
  {path: 'vacuna/form/:id', component: FormVacunaComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN', role2:'ROLE_VETERINARIO' }},
  {path: 'trabajador', component: TrabajadorComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' , role2:'ROLE_TRABAJADOR'}},
  {path: 'trabajador/form', component: FormTrabajadorComponent,canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN', role2:'ROLE_TRABAJADOR' }},
  {path:'trabajador/form/:id', component: FormTrabajadorComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' , role2:'ROLE_TRABAJADOR'}},
  {path: 'produccion', component: ProduccionComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' , role2:'ROLE_TRABAJADOR'}},
  {path: 'producciones/form', component: FormProduccionComponent,canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' , role2:'ROLE_TRABAJADOR'}},
  {path: 'produccion/form/:id', component: FormProduccionComponent,canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' , role2:'ROLE_TRABAJADOR'}},
  {path: 'vacunacion', component: VacunacionComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN', role2:'ROLE_VETERINARIO' }},
  {path: 'vacunacion/form', component: FormVacunacionComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' , role2:'ROLE_VETERINARIO'}},
  {path: 'venta', component: VentaComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN', role2:'ROLE_TRABAJADOR' }},
  {path: 'venta/form', component: FormVentaComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN', role2:'ROLE_TRABAJADOR' }},
  {path: 'venta/form/:id', component: FormVentaComponent, canActivate:[AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN', role2:'ROLE_TRABAJADOR' }},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }