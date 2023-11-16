import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Vacuna } from './vacuna';
import { VacunaService } from './vacuna.service';

@Component({
  selector: 'app-vacuna',
  templateUrl: './vacuna.component.html',
  styleUrls: ['./vacuna.component.css']
})
export class VacunaComponent implements OnInit {


  vacunas!: Vacuna[];
  constructor(private vacunaService: VacunaService) 
  { }

  ngOnInit(): void 
  {

    this.vacunaService.getVacunas().subscribe(
      vacunas => this. vacunas =  vacunas
    );
  }

  delete(vacuna: Vacuna): void {
    Swal.fire({
      
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminarla vacuna ${vacuna.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Eliminar!'
    }).then((result) => {
      if (result.value) {

        this.vacunaService.delete(vacuna.id).subscribe(
          () => {
            this.vacunas = this.vacunas.filter(tra => tra !== vacuna)
            Swal.fire(
              'vacuna Eliminado!',
              `vacuna ${vacuna.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }



}
