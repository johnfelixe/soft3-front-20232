import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Finca } from '../finca/finca';
import { Vaca } from './vaca';
import { AuthService } from '../users/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class VacaService
 {

  private  urlEndPoint:string ='http://localhost:8080/api/v1/agroeasy';

  constructor(private http: HttpClient,private router: Router, public authService: AuthService) { }

  getVacas(): Observable<Vaca[]>
  {
  
    return this.http.get<Vaca[]>(this.urlEndPoint +'/vaca/listar').pipe(
      catchError(e =>{
        return throwError(e);
      })
    )
  
  }

  getFincas(): Observable<Finca[]>
  {
  
    return this.http.get<Finca[]>(this.urlEndPoint +'/finca/listar').pipe(
      catchError(e =>{
        return throwError(e);
      })
    )
  
  }
  
  create(vaca: Vaca): Observable<Vaca> 
  {
    return this.http.post(this.urlEndPoint + '/vaca/agregar', vaca).pipe(
      map((response: any) => response.vaca as Vaca),
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


  delete(id: number): Observable<Vaca> {
    return this.http.delete<Vaca>(`${this.urlEndPoint}/vaca/eliminar/${id}`).pipe(
      catchError(e => {

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }


  getVaca(id:any): Observable<Vaca> {
    return this.http.get<Vaca>(`${this.urlEndPoint}/vaca/${id}`).pipe(
      catchError(e => {

        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/vacas']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }

  update(vaca: Vaca): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/vaca/actualizar/${vaca.id}`, vaca).pipe(
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
