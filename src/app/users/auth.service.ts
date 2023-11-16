import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService
 {

     _usuario: User | undefined;
     _token: string | undefined ;

  constructor(private http: HttpClient ) { 


   }

  public get usuario(): User {
    if (this._usuario != null) {
      return this._usuario;

    } else if (this._usuario == null && sessionStorage.getItem('usuario') != "" ) {

      this._usuario = JSON.parse(sessionStorage.getItem('usuario')|| '{}') as User  ;

      return this._usuario;
    }
    return new User();
  }

  public get token(): any {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') || '{}';
      return this._token;
    }
      return null;
    
  }

  login(usuario: User): Observable<any> {

    const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }
  
   guardarUsuario(accesToken: string): void{
    let payload = this.obtenerDatosToken( accesToken );
    this._usuario = new User();
    this._usuario.username = payload.user_name;
    this._usuario.role= payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));

   }

   guardarToken(accesToken: string): void{
    this._token = accesToken;
    sessionStorage.setItem('token', accesToken);
     
   }
   obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }
  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }
  hasRole(role: string): boolean {
    if (this.usuario.role.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void {

    this._token = undefined;
    this._usuario =undefined ;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
  
}
