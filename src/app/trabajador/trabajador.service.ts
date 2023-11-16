import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Trabajador } from './trabajador';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Finca } from '../finca/finca';
import { Router } from '@angular/router';
import { AuthService } from '../users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  private  urlEndPoint:string ='http://localhost:8080/api/v1/agroeasy';

  constructor(private http: HttpClient,private router: Router, public authService: AuthService) { }


  getTrabajadores(): Observable<Trabajador[]>
  {
  
 
    return this.http.get<Trabajador[]>(this.urlEndPoint +'/trabajador/listar')
  
  }
  getVeterinarios(): Observable<Trabajador[]>
  {
  
    return this.http.get<Trabajador[]>(this.urlEndPoint +'/veterinario/listar')
  
  }
  getEmpleados(): Observable<Trabajador[]>
  {
  
    return this.http.get<Trabajador[]>(this.urlEndPoint +'/empleados/listar')
  
  }

  getFincas(): Observable<Finca[]>
  {
  
    return this.http.get<Finca[]>(this.urlEndPoint +'/finca/listar')
  
  }
  
  create(trabajador: Trabajador): Observable<Trabajador> 
  {
    return this.http.post(this.urlEndPoint + '/trabajador/agregar', trabajador).pipe(
      map((response: any) => response.trabajador as Trabajador),
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
      
  }


  delete(id: number): Observable<Trabajador> {
    return this.http.delete<Trabajador>(`${this.urlEndPoint}/trabajador/eliminar/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }




  getTrabajador(id:any): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.urlEndPoint}/trabajador/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

  update(trabajador: Trabajador): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/trabajador/actualizar/${trabajador.id}`, trabajador).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));

  }




}
