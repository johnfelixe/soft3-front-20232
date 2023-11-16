import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Finca } from 'src/app/finca/finca';
import { Trabajador } from 'src/app/trabajador/trabajador';
import { Vaca } from 'src/app/vaca/vaca';
import { Vacuna } from 'src/app/vacuna/vacuna';

import Swal from 'sweetalert2';
import { Vacunacion } from '../vacunacion';
import { VacunacionService } from '../vacunacion.service';
import { TrabajadorService } from '../../trabajador/trabajador.service';

@Component({
  selector: 'app-form-vacunacion',
  templateUrl: './form-vacunacion.component.html',
  styleUrls: ['./form-vacunacion.component.css']
})
export class FormVacunacionComponent implements OnInit {

  vacunacion: Vacunacion = new Vacunacion()

  vacas!:Vaca[];
  vacunas!: Vacuna[];
  trabajadores!:Trabajador[];

  titulo: string = "Registrar vacunacion"
  errores!: string[];

  constructor(private vacunacionService:VacunacionService, private trabajadorService: TrabajadorService,private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.vacunacionService.getVacunas().subscribe(
      vacunas => this.vacunas = vacunas
    );

    this.trabajadorService.getVeterinarios().subscribe(
      trabajadores=> this.trabajadores = trabajadores
      
    );

    this.vacunacionService.getVacas().subscribe(
      vacas => this.vacas = vacas
    );
    
  }

  create(): void {
    console.log(this.vacunacion);
    this.vacunacionService.create(this.vacunacion).subscribe(
      vacunacion => {
          this.router.navigate(['/vacunacion']);
          Swal.fire({

            icon: 'success',
            title: `La vacunacion  ha sido creado con éxito`,
           
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

}
