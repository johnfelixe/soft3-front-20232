import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Vacuna } from './vacuna';


@Injectable({
  providedIn: 'root'
})
export class VacunaService 
{
  private  urlEndPoint:string ='http://localhost:8080/api/v1/agroeasy';
  constructor(private http: HttpClient,private router: Router) { }


  getVacunas(): Observable<Vacuna[]>
  {  
   return this.http.get<Vacuna[]>(this.urlEndPoint + '/vacuna/listar')
  
  }


  
  create(vacuna: Vacuna): Observable<Vacuna> 
  {
    return this.http.post(this.urlEndPoint + '/vacuna/agregar', vacuna).pipe(
      map((response: any) => response.vacuna as Vacuna),
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


  delete(id: number): Observable<Vacuna> {
    return this.http.delete<Vacuna>(`${this.urlEndPoint}/vacuna/eliminar/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }


  getVacuna(id:any): Observable<Vacuna> {
    return this.http.get<Vacuna>(`${this.urlEndPoint}/vacuna/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/vacuna']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }

  update(vacuna: Vacuna): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/vacuna/actualizar/${vacuna.id}`, vacuna).pipe(
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
