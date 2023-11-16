import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Trabajador } from '../trabajador/trabajador';
import { Vaca } from '../vaca/vaca';
import { Vacuna } from '../vacuna/vacuna';
import { Vacunacion } from './vacunacion';

@Injectable({
  providedIn: 'root'
})
export class VacunacionService {

  private  urlEndPoint:string ='http://localhost:8080/api/v1/agroeasy';

  constructor(private http: HttpClient) { }



  getVacunaciones(): Observable<Vacunacion[]>
  {
  
 
    return this.http.get<Vacunacion[]>(this.urlEndPoint +'/vacunacion/listar')
  
  }

 
  getVacunas(): Observable<Vacuna[]>
  {  
   return this.http.get<Vacuna[]>(this.urlEndPoint + '/vacuna/listar')
  
  }
  
  getVacas(): Observable<Vaca[]>
  {
  
    return this.http.get<Vaca[]>(this.urlEndPoint +'/vaca/listar')
  
  }

  getVeterinarios(): Observable<Trabajador[]>
  {
  

    
    
   return this.http.get<Trabajador[]>(this. urlEndPoint+ '/trabajador/listar')
  
  }


  create(vacunacion: Vacunacion): Observable<Vacunacion> 
  {
    return this.http.post(this.urlEndPoint + '/vacunacion/agregar', vacunacion).pipe(
      map((response: any) => response.vacunacion as Vacunacion),
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


  delete(id: number): Observable<Vacunacion> {
    return this.http.delete<Vacunacion>(`${this.urlEndPoint}/vacunacion/eliminar/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }



}
