import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Finca } from './finca';
import { Router } from '@angular/router';
import { AuthService } from '../users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FincaService {
  
  private  urlEndPoint:string ='http://localhost:8080/api/v1/agroeasy';

  constructor(private http: HttpClient,private router: Router, public authService: AuthService) { }


  getFincas(): Observable<Finca[]>
  {
  
    return this.http.get<Finca[]>(this.urlEndPoint +'/finca/listar')
  
  }
  getFinca(id:any): Observable<Finca> {
    return this.http.get<Finca>(`${this.urlEndPoint}/finca/${id}`);
  }
}
