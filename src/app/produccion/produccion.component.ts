import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Produccion } from './produccion';
import { ProduccionService } from './produccion.service';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})
export class ProduccionComponent implements OnInit {

  producciones!: Produccion[];
  

  constructor(private produccionService: ProduccionService) { }
  ngOnInit(): void 
  {

    this.produccionService.getProducciones().subscribe(
      producciones => this.producciones =  producciones
    );

    
  }


  delete(produccion: Produccion): void {
    Swal.fire({
      
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar esta produccion  ${produccion.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Eliminar!'
    }).then((result) => {
      if (result.value) {

        this.produccionService.delete(produccion.id).subscribe(
          () => {
            this.producciones = this.producciones.filter(tra => tra !== produccion)
            Swal.fire(
              'producccion Eliminado!',
              `produccion ${produccion.id} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }
}
