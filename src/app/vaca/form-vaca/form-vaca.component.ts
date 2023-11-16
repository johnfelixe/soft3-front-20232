import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Finca } from 'src/app/finca/finca';
import Swal from 'sweetalert2';
import { Vaca } from '../vaca';
import { VacaService } from '../vaca.service';

@Component({
  selector: 'app-form-vaca',
  templateUrl: './form-vaca.component.html',
  styleUrls: ['./form-vaca.component.css']
})
export class FormVacaComponent implements OnInit 
{
vaca: Vaca = new Vaca()
titulo: string = "Registrar vaca"

fincas!: Finca[];

errores!: string[];

constructor(private vacaService:VacaService,private router: Router,
  private activatedRoute: ActivatedRoute) { }

ngOnInit(): void 
{

  this.activatedRoute.paramMap.subscribe(params => {
    let id = params.get('id')
      if (id) {
        this.vacaService.getVaca(id).subscribe((vaca) => this.vaca = vaca);
      }
    });


  this.vacaService.getFincas().subscribe(
    fincas => this.fincas = fincas
  );
}

create(): void {
  console.log(this.vaca);
  this.vacaService.create(this.vaca).subscribe(
    vaca => {
        this.router.navigate(['/vacas']);
        Swal.fire({
      
          icon: 'success',
          title: `La vaca  ha sido creado con éxito`,
        
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
  console.log(this.vaca);
  
  this.vacaService.update(this.vaca)
    .subscribe(
      json => {
        this.router.navigate(['/vacas']);
        Swal.fire('vaca Actualizado', `${json.mensaje}: ${json.vaca.nombre}`, 'success');
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
