import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Finca } from 'src/app/finca/finca';
import Swal from 'sweetalert2';
import { Trabajador } from '../trabajador';
import { TrabajadorService } from '../trabajador.service';
import { FincaService } from '../../finca/finca.service';

@Component({
  selector: 'app-form-trabajador',
  templateUrl: './form-trabajador.component.html',
  styleUrls: ['./form-trabajador.component.css']
})
export class FormTrabajadorComponent implements OnInit {


  trabajador: Trabajador = new Trabajador()
  empleos:string []= ["VETERINARIO","ADMINISTRADOR","EMPLEADO"];
  fincas!: Finca[];
  titulo: string = "Crear trabajador"
  errores!: string[];

  constructor(private fincaService:FincaService, private trabajadorService:TrabajadorService,private router: Router,
    private activatedRoute: ActivatedRoute) {

     }

  ngOnInit(): void 
  {
    this.activatedRoute.paramMap.subscribe(params => {
    let id = params.get('id')
      if (id) {
        this.trabajadorService.getTrabajador(id).subscribe((trabajador) => this.trabajador = trabajador);
      }
    });




    this.trabajadorService.getFincas().subscribe(
      fincas => this.fincas = fincas
    );
  }

  create(): void {

    this.trabajadorService.create(this.trabajador).subscribe(
      trabajador => {
          this.router.navigate(['/trabajador']);
          Swal.fire('trabajador creado', ` ${trabajador.nombre}`, 'success')
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
    console.log(this.trabajador);
    
    this.trabajadorService.update(this.trabajador)
      .subscribe(
        json => {
          this.router.navigate(['/trabajador']);
          Swal.fire('trabajador Actualizado', `${json.mensaje}: ${json.trabajador.nombre}`, 'success');
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
