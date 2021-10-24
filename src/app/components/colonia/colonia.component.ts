import { Component, OnInit,Input, Output } from '@angular/core';
import { ColoniaService } from 'src/app/services/colonia.service';
import { Router } from '@angular/router';
import { ColoniaModel } from 'src/app/model/colonia.model';


@Component({
  selector: 'app-colonia',
  templateUrl: './colonia.component.html',
  styleUrls: ['./colonia.component.css']
})
export class ColoniaComponent implements OnInit {

  colonias: ColoniaModel[] = [];

  constructor(
    public service: ColoniaService,
    private router: Router) { }

  ngOnInit(): void {
    this.getColonias();
  }

  getColonias(): void {
    this.service.getColonias().subscribe((resp: any) => {
      this.colonias = resp;
      console.log(this.colonias);
    });
  }

}
