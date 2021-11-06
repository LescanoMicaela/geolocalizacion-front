import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ColonyModel } from '@app/model/colony.model';
import { ColonyRequestModel } from '@app/model/colonyRequest.model';
import { ColonyService } from '@app/services/colony.service';
import { TokenStorageService } from '@app/services/token-storage.service';
import { MapComponent } from '../map/map.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';



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
    private cdRef: ChangeDetectorRef, private router: Router,public translate: TranslateService) { 
      this.translate = translate;}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }


  onSubmit(): void {
    console.log(this.form, this.map.enteredDirection, this.map.center.lat, this.map.center.lng);
    let colony: ColonyRequestModel = new ColonyRequestModel(
      this.form.cats,
      this.form.register,
      this.map.center.lng,
      this.map.center.lat);
    console.log(colony);
    this.saveColonies(colony);
  }

  saveColonies(newColony: any): void {

    if (!newColony.lat || !newColony.lng) {
      Swal.fire({
        title: 'Error',
        text: this.translate.instant('LOCATION_NOT_FOUND'),
        icon: 'error'
      })
      return;
    }

    Swal.fire({
      title: this.translate.instant('SWAL.COLONY_FORM_TITLE'),
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
            title: this.translate.instant('COLONY_SAVED'),
            text: this.translate.instant('DATA_SAVED'),
            icon: 'success'
          })
        })
        setTimeout(() => {
          this.router.navigate(['/colonias']);
        },
          2000);
      } else if (result.isDenied) {
        Swal.fire(this.translate.instant('COLONY_NOT_SAVED'), '', 'info')
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
