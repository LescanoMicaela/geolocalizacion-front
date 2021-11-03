import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ColonyModel } from '@app/model/colony.model';
import { ColonyRequestModel } from '@app/model/colonyRequest.model';
import { ColonyService } from '@app/services/colony.service';
import { TokenStorageService } from '@app/services/token-storage.service';
import { MapComponent } from '../map/map.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';



@Component({
  selector: 'app-colony-form',
  templateUrl: './colony-form.component.html',
  styleUrls: ['./colony-form.component.css']
})
export class ColonyFormComponent implements OnInit {
  form: any = {};

  colonies: ColonyModel[] = [];
  colony: ColonyModel;

  isLoggedIn: boolean = false;

  @ViewChild(MapComponent)
  map: MapComponent;

  registar = true;

  constructor(public service: ColonyService, private tokenStorage: TokenStorageService,
    private cdRef: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }


  onSubmit(): void {
    console.log(this.form, this.map.enteredDirection, this.map.newLng, this.map.newLat);
    let colony: ColonyRequestModel = new ColonyRequestModel(
      this.form.cats,
      this.form.register,
      this.map.newLng,
      this.map.newLat);
    console.log(colony);
    this.saveColonies(colony);
  }

  saveColonies(newColony: any): void {

    if (!newColony.lat || !newColony.lng) {
      Swal.fire({
        title: 'Error',
        text: 'Localización no encontrada',
        icon: 'error'
      })
      return;
    }

    Swal.fire({
      title: '¿Quiere registar una colonia en la localización seleccionada?',
      showDenyButton: true,
      icon: 'warning',
      confirmButtonText: 'Si',
      denyButtonText: 'No',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.saveColony(newColony).subscribe((resp: any) => {
          this.colony = resp;
          console.log(this.colony);
          Swal.fire({
            title: 'Colonia registrada',
            text: 'Se han guardado los datos correctamente',
            icon: 'success'
          })

        })
        setTimeout(() => {
          this.router.navigate(['/colonias']);
        },
          5000);

      } else if (result.isDenied) {
        Swal.fire('No se ha guardado la colonia', '', 'info')
      }
    })
  }



  //check changes if model changed
  //manually trigger change detection for the current component for error: Expression ___ has changed after it was checked
  ngAfterViewInit() {
    this.map.enteredDirection = '';
    this.cdRef.detectChanges();
  }


}
