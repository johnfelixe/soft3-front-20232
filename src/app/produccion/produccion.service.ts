import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Finca } from '../finca/finca';
import { Trabajador } from '../trabajador/trabajador';
import { Vaca } from '../vaca/vaca';
import { Produccion } from './produccion';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService 
{

  private  urlEndPoint:string ='http://localhost:8080/api/v1/agroeasy';

  constructor(private http: HttpClient,private router: Router) { }



  getProducciones(): Observable<Produccion[]>
  {
  
 
    return this.http.get<Produccion[]>(this.urlEndPoint +'/produccion/listar')
  
  }


  getTrabajadores(): Observable<Trabajador[]>
  {
  

    return this.http.get<Trabajador[]>(this.urlEndPoint +'/trabajador/listar')
  
  }

  getFincas(): Observable<Finca[]>
  {
  
    return this.http.get<Finca[]>(this.urlEndPoint +'/finca/listar')
  
  }
  
  getVacas(): Observable<Vaca[]>
  {
  
    return this.http.get<Vaca[]>(this.urlEndPoint +'/vaca/listar')
  
  }


  create(produccion: Produccion): Observable<Produccion> 
  {
    return this.http.post(this.urlEndPoint + '/produccion/agregar', produccion).pipe(
      map((response: any) => response.produccion as Produccion),
      catchError(e => {
     
        return throwError(e);
      }));
      
  }


  delete(id: number): Observable<Produccion> {
    return this.http.delete<Produccion>(`${this.urlEndPoint}/produccion/eliminar/${id}`).pipe(
      catchError(e => {
  
        return throwError(e);
      }));
  }



  getProduccion(id:any): Observable<Produccion> {
    return this.http.get<Produccion>(`${this.urlEndPoint}/produccion/${id}`).pipe(
      catchError(e => {
     
        return throwError(e);
      }));
  }

  update(produccion: Produccion): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/produccion/actualizar/${produccion.id}`, produccion).pipe(
      catchError(e => {
     
        return throwError(e);
      }));
  }

}
