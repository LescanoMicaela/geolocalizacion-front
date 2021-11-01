import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ColoniaModel } from '@app/model/colonia.model';
import { ColoniaRequestModel } from '@app/model/coloniaRequest.model';
import { ColoniaService } from '@app/services/colonia.service';
import { TokenStorageService } from '@app/services/token-storage.service';
import { MapComponent } from '../map/map.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';



@Component({
  selector: 'app-colonia-form',
  templateUrl: './colonia-form.component.html',
  styleUrls: ['./colonia-form.component.css']
})
export class ColoniaFormComponent implements OnInit {
  form: any = {};

  colonias: ColoniaModel[] = [];
  colonia: ColoniaModel;

  isLoggedIn: boolean = false;

  @ViewChild(MapComponent)
  map: MapComponent;

  registar = true;

  constructor(public service: ColoniaService, private tokenStorage: TokenStorageService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
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

    if (!nuevaColonia.latitud || !nuevaColonia.longitud) {
      Swal.fire({
        title: 'Error',
        text: 'Localización no encontrada',
        icon: 'error'
      })
      return;
    }

    this.service.saveColonia(nuevaColonia).subscribe((resp: any) => {
      this.colonia = resp;
      console.log(this.colonia);
      Swal.fire({
        title: 'Colonia registrada',
        text: 'Se ha guardado la colonia correctamente',
        icon: 'success'
      })

    });
  }

  //check changes if model changed
  //manually trigger change detection for the current component for error: Expression ___ has changed after it was checked
  ngAfterViewInit() {
    this.map.direccionIntroducida = '';
      this.cdRef.detectChanges();
    }
  

}
