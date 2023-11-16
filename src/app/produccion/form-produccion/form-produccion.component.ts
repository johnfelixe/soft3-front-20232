import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Finca } from 'src/app/finca/finca';
import { Trabajador } from 'src/app/trabajador/trabajador';
import { Vaca } from 'src/app/vaca/vaca';
import Swal from 'sweetalert2';
import { Produccion } from '../produccion';
import { ProduccionService } from '../produccion.service';
import { TrabajadorService } from '../../trabajador/trabajador.service';

@Component({
  selector: 'app-form-produccion',
  templateUrl: './form-produccion.component.html',
  styleUrls: ['./form-produccion.component.css']
})
export class FormProduccionComponent implements OnInit {

  produccion: Produccion = new Produccion()

  vacas!:Vaca[];
  fincas!: Finca[];
  trabajadores!:Trabajador[];
  titulo: string = "Registrar producccion"
  errores!: string[];

  constructor(private trabajadorService: TrabajadorService,private produccionService:ProduccionService,private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void 
  {

    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id')
        if (id) {
          this.produccionService.getProduccion(id).subscribe((producccion) => this.produccion = producccion);
        }
      });


    this.produccionService.getFincas().subscribe(
      fincas => this.fincas = fincas
    );

    this.trabajadorService.getEmpleados().subscribe(
      trabajadores => this.trabajadores = trabajadores
    );

    this.produccionService.getVacas().subscribe(
      vacas => this.vacas = vacas
    );
  }

  create(): void {
    console.log(this.produccion);
    this.produccionService.create(this.produccion).subscribe(
      produccion => {
          this.router.navigate(['/produccion']);
          Swal.fire({
      
            icon: 'success',
            title: `La produccion  ha sido creado con éxito`,
         
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
    console.log(this.produccion);
    
    this.produccionService.update(this.produccion)
      .subscribe(
        json => {
          this.router.navigate(['/produccion']);
          Swal.fire('produccion Actualizado', 'success');
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
      )
  }


  comparar(o1:any, o2:any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }


}
