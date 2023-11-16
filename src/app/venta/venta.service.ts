import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Finca } from '../finca/finca';
import { Trabajador } from '../trabajador/trabajador';
import { Venta } from './venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private  urlEndPoint:string ='http://localhost:8080/api/v1/agroeasy';

  constructor(private http: HttpClient,private router: Router) { }



  getVentas(): Observable<Venta[]>
  {
  
 
    return this.http.get<Venta[]>(this.urlEndPoint +'/venta/listar')
  
  }

 

  
  getFincas(): Observable<Finca[]>
  {
  
    return this.http.get<Finca[]>(this.urlEndPoint +'/finca/listar')
  
  }

  getTrabajadores(): Observable<Trabajador[]>
  {
  
    
   return this.http.get<Trabajador[]>(this. urlEndPoint+ '/trabajador/listar')
  
  }



  create(venta: Venta): Observable<Venta> 
  {
    return this.http.post(this.urlEndPoint + '/venta/agregar', venta).pipe(
      map((response: any) => response.venta as Venta),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
      
  }



  delete(id: number): Observable<Venta> 
  {
    return this.http.delete<Venta>(`${this.urlEndPoint}/venta/eliminar/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }
  

  getVenta(id:any): Observable<Venta> {
    return this.http.get<Venta>(`${this.urlEndPoint}/venta/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/vacuna']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }

  update(venta: Venta): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/venta/actualizar/${venta.id}`, venta).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

   





}
