import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Finca } from 'src/app/finca/finca';
import { Trabajador } from 'src/app/trabajador/trabajador';
import { Vaca } from 'src/app/vaca/vaca';
import { Vacuna } from 'src/app/vacuna/vacuna';
import Swal from 'sweetalert2';
import { Venta } from '../venta';
import { VentaService } from '../venta.service';
import { TrabajadorService } from '../../trabajador/trabajador.service';

@Component({
  selector: 'app-form-venta',
  templateUrl: './form-venta.component.html',
  styleUrls: ['./form-venta.component.css']
})
export class FormVentaComponent implements OnInit {

  venta: Venta = new Venta()

  fincas!:Finca[];
  trabajadores!:Trabajador[];
  titulo: string = "Registrar venta"
  errores!: string[];

  constructor(private ventaService:VentaService, private trabajadorService: TrabajadorService,private router: Router,
    private activatedRoute: ActivatedRoute) { }

    
  ngOnInit(): void 
  {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id')
        if (id) {
          this.ventaService.getVenta(id).subscribe((venta) => this.venta = venta);
        }
      });

      this.trabajadorService.getEmpleados().subscribe(
        trabajadores=> this.trabajadores = trabajadores
        
      );
   

    this.ventaService.getFincas().subscribe(
      fincas => this.fincas = fincas
    );
  }

  create(): void {
    console.log(this.venta);
    this.ventaService.create(this.venta).subscribe(
      venta => {
          this.router.navigate(['/venta']);
          Swal.fire({
          
            icon: 'success',
            title: `La venta  ha sido creado con éxito`,
            
          })
        },
        err => {
         this.errores = err.error.errors as string[];
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error: ${err.error.mensaje}`,
          footer: '<a href="">Why do I have this issue?</a>'
        })
        }
      );
  }





  update(): void {
    console.log(this.venta);
    
    this.ventaService.update(this.venta)
      .subscribe(
        json => {
          this.router.navigate(['/venta']);
          Swal.fire('Venta Actualizado',  'success');
        },
        err => {
          this.errores = err.error.errors as string[];

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.error.mensaje}`,
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      )
  }


  comparar(o1:any, o2:any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }
}
