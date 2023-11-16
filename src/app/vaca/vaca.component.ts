import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Vaca } from './vaca';
import { VacaService } from './vaca.service';
import { AuthService } from '../users/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vaca',
  templateUrl: './vaca.component.html'
})
export class VacaComponent implements OnInit {

  vacas!: Vaca[];
  

  constructor(private vacaService: VacaService, public authService: AuthService, private activatedRoute:ActivatedRoute) { 

  }

  ngOnInit(): void 
  {

    this.vacaService.getVacas().subscribe(
      vacas => this.vacas = vacas
    );

    
  }

  
  delete(vaca: Vaca): void {
    Swal.fire({
      
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al trabajador ${vaca.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Eliminar!'
    }).then((result) => {
      if (result.value) {

        this.vacaService.delete(vaca.id).subscribe(
          () => {
            this.vacas = this.vacas.filter(tra => tra !== vaca)
            Swal.fire(
              'trabajador Eliminado!',
              `trabajador eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }
  
  }
  