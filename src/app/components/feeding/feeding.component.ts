import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColonyModel } from '@app/model/colony.model';
import { ColonyService } from '@app/services/colony.service';
import { TokenStorageService } from '@app/services/token-storage.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-feeding',
  templateUrl: './feeding.component.html',
  styleUrls: ['./feeding.component.css']
})
export class FeedingnComponent implements OnInit {

  form: any = {};

  center: any;

  id: number;

  isLoggedIn: boolean = false;
  private contentPlaceholder: ElementRef;


  colonies: ColonyModel[] = [];
  constructor(public service: ColonyService, private tokenStorage: TokenStorageService,
    private route: ActivatedRoute, private router: Router) {
    this.service = service;
  }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.route.params.subscribe(routeParams => {
        routeParams.id ? (this.id = routeParams.id, this.getColony(routeParams.id)) : null;
        this.waitForElement(this.id+'');
      });
      this.getColonies();
    }
  }

  onSubmit(): void {
    console.log(this.form)
    this.saveFedding(this.form, this.id);
  }

  getColony(id: number) {
    this.service.getColonyById(id).subscribe((resp: any) => {
      console.log(resp);
      this.center = {
        lat: resp.latitud,
        lng: resp.longitud
      }

    });

  }
  saveFedding(feeding: any, colonyId: number): void {
    console.log(colonyId)
    this.service.saveFeeding(colonyId, feeding).subscribe((resp: any) => {
      console.log(feeding);
      Swal.fire({
        title: 'Colonia alimentada',
        text:  'Se han guardado los datos correctamente',  
        icon: 'success'
      })
    });
  }

  getColonies(): void {
    this.service.getColonies().subscribe((resp: any) => {
      this.colonies = resp;
      console.log(this.colonies);
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
