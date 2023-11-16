import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Venta } from './venta';
import { VentaService } from './venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  ventas!: Venta[];
  

  constructor(private ventaService: VentaService) { }
  ngOnInit(): void 
  {

    this.ventaService.getVentas().subscribe(
      ventas => this.ventas =  ventas
    );

    
  }


  delete(venta: Venta): void {
    Swal.fire({
      
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminarla vacuna  ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Eliminar!'
    }).then((result) => {
      if (result.value) {

        this.ventaService.delete(venta.id).subscribe(
          () => {
            this.ventas = this.ventas.filter(tra => tra !== venta)
            Swal.fire(
              'vacuna Eliminado!',
              `vacuna  eliminada con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }

}
