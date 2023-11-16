import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Finca } from '../finca/finca';
import { Trabajador } from './trabajador';
import { TrabajadorService } from './trabajador.service';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {
  trabajadores!: Trabajador[];
  

  constructor(private trabajadorService: TrabajadorService) { }

  ngOnInit(): void 
  {

    this.trabajadorService.getTrabajadores().subscribe(
      trabajadores => this.trabajadores = trabajadores
    );

    
  }


  delete(trabajador: Trabajador): void {
    Swal.fire({
      
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al trabajador ${trabajador.nombre} ${trabajador.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Eliminar!'
    }).then((result) => {
      if (result.value) {

        this.trabajadorService.delete(trabajador.id).subscribe(
          () => {
            this.trabajadores = this.trabajadores.filter(tra => tra !== trabajador)
            Swal.fire(
              'trabajador Eliminado!',
              `trabajador ${trabajador.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }

}
