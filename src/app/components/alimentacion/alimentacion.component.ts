import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColoniaModel } from '@app/model/colonia.model';
import { ColoniaService } from '@app/services/colonia.service';
import { TokenStorageService } from '@app/services/token-storage.service';

@Component({
  selector: 'app-alimentacion',
  templateUrl: './alimentacion.component.html',
  styleUrls: ['./alimentacion.component.css']
})
export class AlimentacionComponent implements OnInit {

  form: any = {};

  center: any;

  id: number;

  isLoggedIn: boolean = false;

  colonias: ColoniaModel[] = [];
  constructor(public service: ColoniaService, private tokenStorage: TokenStorageService,
    private route: ActivatedRoute, private router: Router) {
    this.service = service;
  }

  ngOnInit(): void {

 this.router.routeReuseStrategy.shouldReuseRoute = () => false;


    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.route.params.subscribe(routeParams => {
        routeParams.id ?  ( this.id = routeParams.id,   this.getColonia(routeParams.id)) : null;
      });
  
      this.getColonias();
    }


 }

  onSubmit(): void {
    console.log(this.form)
    this.saveAlimentacion(this.form,this.id);
  }

  getColonia(id: number){
    this.service.getColoniaById(id).subscribe((resp: any) => {
      console.log(resp);
      this.center = {
        lat: resp.latitud,
        lng: resp.longitud
      }
      console.log("THIS CENTER:   " +this.center);
    });

  }
  saveAlimentacion(alimentacion: any, coloniaId: number): void {
    this.service.saveAlimentacion(coloniaId, alimentacion).subscribe((resp: any) => {
      console.log(alimentacion);
    });
  }

  getColonias(): void {
    this.service.getColonias().subscribe((resp: any) => {
      this.colonias = resp;
      console.log(this.colonias);
    });
  }
}
