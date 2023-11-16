import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {


  constructor(private authService: AuthService,
    private router: Router) { }

    canActivate(

      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }
  
      let role = next.data['role'] as string;
      let role2 = next.data['role2'] as string;
      let role3= next.data['role3'] as string;
      console.log(role);
      if (this.authService.hasRole(role)||this.authService.hasRole(role2)||this.authService.hasRole(role3)) {
        return true;
      }
      Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/home']);
      return false;
    }
  
}
