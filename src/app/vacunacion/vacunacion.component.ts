import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Vacunacion } from './vacunacion';
import { VacunacionService } from './vacunacion.service';

@Component({
  selector: 'app-vacunacion',
  templateUrl: './vacunacion.component.html',
  styleUrls: ['./vacunacion.component.css']
})
export class VacunacionComponent implements OnInit {

  vacunaciones!: Vacunacion[];
  

  constructor(private vacunacionService: VacunacionService) { }
  ngOnInit(): void 
  {

    this.vacunacionService.getVacunaciones().subscribe(
      vacunaciones => this.vacunaciones =  vacunaciones
    );

    
  }


  delete(vacunacion: Vacunacion): void {
    Swal.fire({
      
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminarla vacunacion ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Eliminar!'
    }).then((result) => {
      if (result.value) {

        this.vacunacionService.delete(vacunacion.id).subscribe(
          () => {
            this.vacunaciones = this.vacunaciones.filter(tra => tra !== vacunacion)
            Swal.fire(
              'vacunacion Eliminado!',
              `vacunacion eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }
}
