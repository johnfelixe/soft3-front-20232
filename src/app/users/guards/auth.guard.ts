import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isAuthenticated()) {
        if (this.isTokenExpirado()) {
          this.authService.logout();
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
      Swal.fire('Login', `Hola debes estár autenticado!`, 'info');
      this.router.navigate(['/login']);
      return false;
    }
    isTokenExpirado(): boolean {
      let token = this.authService.token;
      let payload = this.authService.obtenerDatosToken(token);
      let now = new Date().getTime() / 1000;
      if (payload.exp < now) {
        return true;
      }
      return false;
    }
}
