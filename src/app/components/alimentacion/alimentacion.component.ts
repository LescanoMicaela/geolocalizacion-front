import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColoniaModel } from '@app/model/colonia.model';
import { ColoniaService } from '@app/services/colonia.service';
import { TokenStorageService } from '@app/services/token-storage.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
  private contentPlaceholder: ElementRef;


  colonias: ColoniaModel[] = [];
  constructor(public service: ColoniaService, private tokenStorage: TokenStorageService,
    private route: ActivatedRoute, private router: Router) {
    this.service = service;


  }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.route.params.subscribe(routeParams => {
        routeParams.id ? (this.id = routeParams.id, this.getColonia(routeParams.id)) : null;
        this.waitForElement(this.id+'');

      });
      this.getColonias();
    }
  }

  onSubmit(): void {
    console.log(this.form)
    this.saveAlimentacion(this.form, this.id);
  }

  getColonia(id: number) {
    this.service.getColoniaById(id).subscribe((resp: any) => {
      console.log(resp);
      this.center = {
        lat: resp.latitud,
        lng: resp.longitud
      }

    });

  }
  saveAlimentacion(alimentacion: any, coloniaId: number): void {
    this.service.saveAlimentacion(coloniaId, alimentacion).subscribe((resp: any) => {
      console.log(alimentacion);
      Swal.fire({
        title: 'Colonia alimentada',
        text:  'Se han guardado los datos correctamente',  
        icon: 'success'
      })
    });
  }

  getColonias(): void {
    this.service.getColonias().subscribe((resp: any) => {
      this.colonias = resp;
      console.log(this.colonias);
    });
  }

  //scroll al element seleccionado
  waitForElement(selector) {
    let element = document.getElementById(selector);
    if (element) {
      document.getElementById(selector).scrollIntoView();
      return;
    }
    let observer = new MutationObserver(mutations => {
      mutations.forEach(function(mutation) {
        let nodes = Array.from(mutation.addedNodes);
        for (var node of nodes) {
          if (node.contains(document.getElementById(selector))) {
            document.getElementById(selector).scrollIntoView();
            observer.disconnect();
            return;
          }
        }
      });
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }


}
