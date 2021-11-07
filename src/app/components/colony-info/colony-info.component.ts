import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColonyModel } from '@app/model/colony.model';
import { ColonyService } from '@app/services/colony.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colony-info',
  templateUrl: './colony-info.component.html',
  styleUrls: ['./colony-info.component.css']
})




export class ColonyInfoComponent implements OnInit {

  imageSrcWater = 'assets/images/water2.png'
  imageAltWater = 'water icon'
  imageSrcFood = 'assets/images/food2.png'
  imageAltFood = 'food icon'

  imageSrc = 'assets/images/cat-black-face.png'
  imageAlt = 'cat icon'
  imageSrcInfo = 'assets/images/info (2).png'
  imageAltInfo = 'more info icon'
  colonySelected: number;
  router: string;
  
  @Input()
  colony: ColonyModel;
  constructor(public _router: Router, private route: ActivatedRoute, public service: ColonyService) {
    this.router = _router.url;
    this._router = _router;
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      routeParams.id ? this.colonySelected = routeParams.id : null;
    });
  }


  scroll(id: number) {
    document.getElementById(id + '').scrollIntoView();
  }

  showInfo(c: ColonyModel) {

    const waterImg = '<img _ngcontent-ama-c69="" src="' + this.imageSrcWater + '" alt="' + this.imageAltWater + '" style="width:2em;">';
    const foodImg = '<img _ngcontent-ama-c69="" src="' + this.imageSrcFood + '"  alt="' + this.imageAltFood + '"   style="width:2em;">'

    const catimg = '<img _ngcontent-ama-c69="" src="' + this.imageSrc + '" alt="' + this.imageAlt + '" style="width:2em;">';



    let alimentacion = '<ul>';
    this.service.getFeeding(c.id).subscribe(resp => {
      if (resp.length === 0) alimentacion = '<p> No existen registros <p>'
      resp.forEach(el => {
        let water = el.water ? waterImg : '';
        let food = el.food ? foodImg : '';
        let empty = water + food == '' ? '/' : ''

        let waterAvailable = el.waterAvailable ? waterImg : '';
        let foodAvailable = el.foodAvailable ? foodImg : '';
        let emptyAvailable = waterAvailable + foodAvailable == '' ? '/' : ''

        alimentacion += '<li><strong>' + el.time + ' </strong><br> <p>Tenía: ' + waterAvailable + ' ' + foodAvailable + emptyAvailable + '</p>' +
          '<p>Se proporcionó: ' + water + ' ' + food + empty + '</p></li>'
      });

      let direction1 = c.direction[1] ? c.direction[1] : "";
      let register = c.register ? 'Colonia censada' : 'Colonia no censada'
      Swal.fire({
        html: catimg + '<h5>' + c.direction[0] + '</h5>' +
          '<p>' + direction1 + '</p>' +
          '<div style="height: 50vh; overflow-y: scroll; text-align: initial;"><h5 style="text-align: initial;">Informacíon </h5>' +
          '<p style="text-align: initial;">' +register + '</p>'+
          '<p style="text-align: initial;"> Número de gatos: '+ c.cats+ '</p>' +
          '<br><h5 style="text-align: initial;">Alimentación</h5>' +
          alimentacion + '</ul></div>',
      });
    })
    console.log(c)
  }

}
