import { Component, ElementRef, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core'
import { GoogleMap } from '@angular/google-maps'
import { ActivatedRoute, Router } from '@angular/router';
import { ColonyService } from '@app/services/colony.service';
import { ColonyModel } from 'src/app/model/colony.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild(GoogleMap)
  map: GoogleMap;
  @ViewChild('mapSearchField')
  searchField: ElementRef;

  imageSrc = 'assets/images/cat-black-face.png'
  imageAlt = 'cat icon'
  imageSrcWater = 'assets/images/water2.png'
  imageAltWater = 'water icon'
  imageSrcFood = 'assets/images/food2.png'
  imageAltFood = 'food icon'

  imageSrcInfo = 'assets/images/info (2).png'
  imageAltInfo = 'more info icon'

  locationPressed = true

  registrar: boolean = false;

  @Input()
  colonies: ColonyModel[] = [];

  enteredDirection: string = '';
  geoCoder = new google.maps.Geocoder;
  address: string = '';
  zoom: number = 20;
  @Input()
  center: any;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    maxZoom: 20,
    minZoom: 8,
  }
  newLat: number;
  newLng: number;
  markers: any[] = [];
  infoContent = '';

  loading = false;
  router: string;
  colonySelected: number;

  constructor(public _router: Router, private route: ActivatedRoute, public service: ColonyService) {
    this.router = _router.url;
    this._router = _router;
  }

  ngOnInit(): void {
    //to update class on selected
    this.route.params.subscribe(routeParams => {
      routeParams.id ? this.colonySelected = routeParams.id : null;
    });
    navigator.geolocation.getCurrentPosition((position) => {
      this.locationPressed = true;
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.getCurrentAddress(position.coords.latitude, position.coords.longitude)
      this.addMarker(position.coords.latitude, position.coords.longitude)
    })
  }


  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['colonies']) {
      if (this.colonies.length != 0) {
        console.log(this.colonies)
        this.loading = true;
        var that = this;
        this.colonies.forEach(
          (c, i, collection) => {
            setTimeout(function () {
              that.addMarker(c.lat, c.lng)
              that.getAddress(c.lat, c.lng, c)
              if (i === (that.colonies.length - 1)) {
                that.loading = false;
              }
            }, i * 900);
          })
      }
    }
    if (changes['center']) {
      this.center = this.center;
    }
  }


  ngAfterViewInit(): void {
    if (this.searchField) {

      const searchBox = new google.maps.places.SearchBox(
        this.searchField.nativeElement,
      );

      this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
        this.searchField.nativeElement,
      );

      searchBox.addListener('places_changed', (ev) => {
        const places = searchBox.getPlaces();
        if (places.length == 0) {
          return;
        }

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          const icon = {
            url: place.icon as string,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
          };

          // Create a marker for each place.
          this.markers.push(
            new google.maps.Marker({
              position: place.geometry.location,
            })
          );

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        this.map.fitBounds(bounds);
        this.locationPressed = true;
        this.center.lat = bounds.getCenter().lat();
        this.center.lng = bounds.getCenter().lng();
        this.addMarker(bounds.getCenter().lat(), bounds.getCenter().lng())
        this.enteredDirection = this.searchField.nativeElement.value;
      });

    }

  };


  getAddress(lat: number, lng: number, colony: ColonyModel) {
    this.geoCoder.geocode({ 'location': { lat: lat, lng: lng } }, async (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          if (colony != null) colony.direction = this.address.match(/[^,]+,[^,]+/g);
        } else {
          colony.direction = ["SIN DIRECCIÓN", "SIN NÚMERO"]
        }
      } else if (status === 'OVER_QUERY_LIMIT') {
      }
      else {
        colony.direction = ["SIN DIRECCIÓN", "SIN NÚMERO"]
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  getCurrentAddress(lat: number, lng: number) {
    this.geoCoder.geocode({ 'location': { lat: lat, lng: lng } }, async (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.enteredDirection = results[0].formatted_address;
        }
      }
      else {
        console.log('Geocoder failed due to: ' + status);
      }
    }
    )
  }

  addMarker(lat: number, lng: number) {
    this.markers.push({
      position: {
        lat: lat,
        lng: lng
      }
    })
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
      if (resp.length === 0) alimentacion = '<br><p> No existen registros <p>'
      resp.forEach(el => {
        let water = el.water ? waterImg : '';
        let food = el.food ? foodImg : '';
        let empty = water + food == '' ? '/' : ''

        let waterAvailable = el.waterAvailable ? waterImg : '';
        let foodAvailable = el.foodAvailable ? foodImg : '';
        let emptyAvailable = waterAvailable + foodAvailable == '' ? '/' : ''

        alimentacion += '<li style="text-align: initial;"><strong>' + el.time + ' </strong><br> <p>Tenía: ' + waterAvailable + ' ' + foodAvailable + emptyAvailable + '</p>' +
          '<p>Se proporcionó: ' + water + ' ' + food + empty + '</p></li>'
      });

      let direction1 = c.direction[1] ? c.direction[1] : "";
      Swal.fire({
        html: catimg + '<h5>' + c.direction[0] + '</h5>' +
          '<p>' + direction1 + '</p>' +
          '<br><div style="height: 50vh; overflow-y: scroll;"> <h5>Alimentación</h5><br>' +
          alimentacion + '</ul></div>',
      });
    })
    console.log(c)
  }

}
