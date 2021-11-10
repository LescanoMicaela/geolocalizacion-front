import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColonyModel } from '@app/model/colony.model';
import { ColonyService } from '@app/services/colony.service';
import { TranslateService } from '@ngx-translate/core';
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
  imageSrcEdit = 'assets/images/edit.png'
  imageAltEdit = 'edot icon'
  imageSrc = 'assets/images/cat-black-face.png'
  imageAlt = 'cat icon'
  imageSrcCat = 'assets/images/cat.png'
  imageSrcInfo = 'assets/images/info (2).png'
  imageAltInfo = 'more info icon'
  colonySelected: number;
  router: string;

  @Input()
  colony: ColonyModel;
  constructor(public _router: Router, private route: ActivatedRoute, public service: ColonyService,
    public translate: TranslateService) {
    this.router = _router.url;
    this._router = _router;
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      routeParams.id ? this.colonySelected = routeParams.id : null;
    });
  }

  ngAfterViewInit() {
  }

  scroll(id: number) {
    document.getElementById(id + '').scrollIntoView();
  }

  showInfo(c: ColonyModel) {

    const self = this;
    const waterImg = '<img _ngcontent-ama-c69="" src="' + this.imageSrcWater + '" alt="' + this.imageAltWater + '" style="width:2em;">';
    const foodImg = '<img _ngcontent-ama-c69="" src="' + this.imageSrcFood + '"  alt="' + this.imageAltFood + '"   style="width:2em;">'
    const catimg = '<img _ngcontent-ama-c69="" src="' + this.imageSrc + '" alt="' + this.imageAlt + '" style="width:2em;">';

    let alimentacion = '<ul>';
    this.service.getFeeding(c.id).subscribe(resp => {
      if (resp.length === 0) alimentacion = '<p>'+ self.translate.instant('INFO.NO_RESULTS')+'<p>'
      resp.forEach(el => {
        let water = el.water ? waterImg : '';
        let food = el.food ? foodImg : '';
        let empty = water + food == '' ? '/' : ''

        let waterAvailable = el.waterAvailable ? waterImg : '';
        let foodAvailable = el.foodAvailable ? foodImg : '';
        let emptyAvailable = waterAvailable + foodAvailable == '' ? '/' : ''

        alimentacion += '<li><strong>' + el.time + ' </strong><br> <p>'+ self.translate.instant('INFO.HAD') + waterAvailable + ' ' + foodAvailable + emptyAvailable + '</p><p>'
        self.translate.instant('INFO.HAD') + water + ' ' + food + empty + '</p></li>'
      });

      let direction1 = c.direction[1] ? c.direction[1] : "";
      let register = c.register ?  self.translate.instant('INFO.REGISTERED_COLONY') : self.translate.instant('INFO.UNREGISTERED_COLONY')
      Swal.fire({
        html: catimg + '<h5>' + c.direction[0] + '</h5>' +
          '<p>' + direction1 + '</p>' +
          '<div style="height: 50vh; overflow-y: scroll; text-align: initial;"><h5 style="text-align: initial;">'+self.translate.instant('INFO.INFO')+ '</h5>' +
          '<p style="text-align: initial;">' + register + '</p>' +
          '<div class="d-flex" ><p style="text-align: initial;">'+ self.translate.instant('INFO.CATS') + c.cats + '</p></div>' +
          '<br><h5 style="text-align: initial;">'+self.translate.instant('INFO.FEED')+'</h5>' +
          alimentacion + '</ul></div>'
      });

    })
  }


  edit(colony: ColonyModel) {
    Swal.fire({
      title:this.translate.instant('INFO.EDIT-MODAL.TITLE'),
      text: this.translate.instant('INFO.EDIT-MODAL.TEXT'),
      input: "number",
      showCancelButton: true,
      cancelButtonText: this.translate.instant('BUTTONS.CANCEL')
    }).then((result) => {
      if (result.isConfirmed) {
        var cats = result.value;
        Swal.fire({
          title: this.translate.instant('INFO.EDIT-MODAL.CONFIRM-TITLE'),
          text: this.translate.instant('INFO.EDIT-MODAL.CONFIRM-TEXT'),
          showCancelButton: true,
          confirmButtonText:  this.translate.instant('BUTTONS.SAVE') ,
          cancelButtonText: this.translate.instant('BUTTONS.CANCEL'),
        }).then((result) => {
          if (result.isConfirmed) {
            this.colony.cats = cats;
            this.service.updateColony(this.colony.id, this.colony).subscribe(resp => {
              console.log("Result: " + result.value);
              Swal.fire(this.translate.instant('INFO.EDIT-MODAL.RESULT'), '', 'success')
            })

          } else if (result.isDenied) {
            Swal.fire(this.translate.instant('INFO.EDIT-MODAL.CANCEL'), '', 'info')
          }
        })
      }
    })
  }

}
