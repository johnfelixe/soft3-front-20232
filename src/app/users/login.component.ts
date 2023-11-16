import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from './user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {


  titulo: string = 'Sign In';
  user: User;

  constructor(private authService:AuthService, private router:Router) { 
    this.user = new User();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/home']);
    }
  }
  

  login(): void 
  {
    console.log(this.user);
    if (this.user.username == null || this.user.password == null) 
    {
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username o password vacías!'
      });
    }
      this.authService.login(this.user).subscribe(response =>{
        console.log(response);
        let payload =JSON.parse(atob(response.access_token.split(".")[1]));
        console.log(payload);

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);

        this.router.navigate(['/home']);
        Swal.fire('Login', `Hola ${payload.user_name}, has iniciado sesión con éxito!`, 'success');
      },err =>{
        if(err.status == 400){
          Swal.fire('Error Login', `Credenciales Incorrectas!`, 'error')
        }
      }
      );
  
    
  }


}
