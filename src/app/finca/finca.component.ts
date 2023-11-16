import { Component, OnInit } from '@angular/core';
import { Finca } from './finca';
import { FincaService } from './finca.service';

@Component({
  selector: 'app-finca',
  templateUrl: './finca.component.html',
  styleUrls: ['./finca.component.css']
})
export class FincaComponent implements OnInit 
{

  fincas!: Finca[];

  constructor(private fincaService: FincaService) { }

  ngOnInit(): void 
  {

    this.fincaService.getFincas().subscribe(
      fincas => this.fincas = fincas
    );
  }

}
