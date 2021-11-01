import { Component, ElementRef, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core'
import { GoogleMap } from '@angular/google-maps'
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ColoniaModel } from 'src/app/model/colonia.model';

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

  registrar: boolean = false;

  @Input()
  colonias: ColoniaModel[] = [];

  direccionIntroducida: string = '';
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
  nuevaLat: number;
  nuevaLong: number;
  markers: any[] = [];
  infoContent = '';

  loading = true;
  router: string;
  coloniaSelected: number;

  constructor(public _router: Router, private route: ActivatedRoute) {
    this.router = _router.url;
    this._router = _router;
  }

  ngOnInit(): void {
    this.loading = true;
    //to update class on selected
    this.route.params.subscribe(routeParams => {
      routeParams.id ? this.coloniaSelected = routeParams.id : null;
    });
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.addMarker(position.coords.latitude, position.coords.longitude)
    })
  }


  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['colonias']) {
      if (this.colonias != []) {
        var that = this;
        this.colonias.forEach(
          (c, i, collection) => {
            setTimeout(function () {
              that.addMarker(c.latitud, c.longitud)
              that.getAddress(c.latitud, c.longitud, c)
              if (i === (that.colonias.length - 1)) {
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
        this.nuevaLat = bounds.getCenter().lat();
        this.nuevaLong = bounds.getCenter().lng();
        this.addMarker(bounds.getCenter().lat(), bounds.getCenter().lng())
        this.direccionIntroducida = this.searchField.nativeElement.value;
      });

    }

  };


  getAddress(latitude: number, longitude: number, colonia: ColoniaModel) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, async (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          if (colonia != null) colonia.direccion = this.address.match(/[^,]+,[^,]+/g);
        } else {
          colonia.direccion = ["SIN DIRECCIÓN", "SIN NÚMERO"]
        }
      } else if (status === 'OVER_QUERY_LIMIT') {
      }
      else {
        colonia.direccion = ["SIN DIRECCIÓN", "SIN NÚMERO"]
        console.log('Geocoder failed due to: ' + status);
      }

    });
  }



  addMarker(lat: number, long: number) {
    this.markers.push({
      position: {
        lat: lat,
        lng: long
      }
    })
  }

  scroll(id: number) {
    document.getElementById(id + '').scrollIntoView();
  }

}
