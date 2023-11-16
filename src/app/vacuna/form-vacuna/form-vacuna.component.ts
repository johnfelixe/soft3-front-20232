import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Vacuna } from '../vacuna';
import { VacunaService } from '../vacuna.service';

@Component({
  selector: 'app-form-vacuna',
  templateUrl: './form-vacuna.component.html',
  styleUrls: ['./form-vacuna.component.css']
})
export class FormVacunaComponent implements OnInit {

  vacuna: Vacuna = new Vacuna()
  titulo: string = "Registrar vacuna"
  errores!: string[];
  constructor(private vacunaService:VacunaService,private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void 
  
  {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id')
        if (id) {
          this.vacunaService.getVacuna(id).subscribe((vacuna) => this.vacuna = vacuna);
        }
      });
  }

  create(): void {
    console.log(this.vacuna);
    this.vacunaService.create(this.vacuna).subscribe(
      vacuna => {
          this.router.navigate(['/vacuna']);
          Swal.fire({
       
            icon: 'success',
            title: `La vacuna ha sido creado con éxito`,
        
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
        console.log(this.vacuna);
        
        this.vacunaService.update(this.vacuna)
          .subscribe(
            json => {
              this.router.navigate(['/vacuna']);
              Swal.fire('vacuna Actualizado',  'success');
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
