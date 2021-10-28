import { Component, Input, OnInit } from '@angular/core';
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

  
  isLoggedIn: boolean = false;

  colonias: ColoniaModel[] = [];
  constructor(public service: ColoniaService, private tokenStorage: TokenStorageService) {
    this.service = service;
   }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    console.log(this.form)
  }

  
  saveAlimentacion(alimentacion: any, coloniaId:number): void {
    this.service.saveAlimentacion(coloniaId,alimentacion).subscribe((resp: any) => {
      console.log(alimentacion);
    });
  }
}
