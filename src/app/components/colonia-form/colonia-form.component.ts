import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ColoniaModel } from '@app/model/colonia.model';
import { ColoniaRequestModel } from '@app/model/coloniaRequest.model';
import { ColoniaService } from '@app/services/colonia.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-colonia-form',
  templateUrl: './colonia-form.component.html',
  styleUrls: ['./colonia-form.component.css']
})
export class ColoniaFormComponent implements OnInit {
  form: any = {};

  colonias: ColoniaModel[] = [];
  colonia: ColoniaModel;


  @ViewChild(MapComponent)
  map: MapComponent;

  registar = true;

  constructor(public service: ColoniaService) { }

  ngOnInit(): void {
    /*   console.log(this.map.direccionIntroducida);
      console.log(this.map.nuevaLong);
      console.log(this.map.nuevaLong); */
  }

  onSubmit(): void {
    console.log(this.form, this.map.direccionIntroducida, this.map.nuevaLong, this.map.nuevaLat);
    let colonia: ColoniaRequestModel = new ColoniaRequestModel(
      this.form.gatos,
      this.form.censo,
      this.map.nuevaLong,
      this.map.nuevaLat);
    console.log(colonia);
    this.saveColonias(colonia);
  }

  saveColonias(nuevaColonia: any): void {
    this.service.saveColonia(nuevaColonia).subscribe((resp: any) => {
      this.colonia = resp;
      console.log(this.colonia);
    });
  }

    ngOnChanges(changes: SimpleChanges) {

    }
}
