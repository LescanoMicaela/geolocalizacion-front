import { Component, OnInit } from '@angular/core';
import { ColoniaModel } from '@app/model/colonia.model';

@Component({
  selector: 'app-alimentacion',
  templateUrl: './alimentacion.component.html',
  styleUrls: ['./alimentacion.component.css']
})
export class AlimentacionComponent implements OnInit {

  form: any = {};

  colonias: ColoniaModel[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {}
}
