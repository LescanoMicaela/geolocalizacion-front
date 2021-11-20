import { Component, ElementRef, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core'
import { GoogleMap } from '@angular/google-maps'
import { ActivatedRoute, Router } from '@angular/router';
import { ColonyService } from '@app/services/colony.service';
import { TranslateService } from '@ngx-translate/core';
import { ColonyModel } from 'src/app/model/colony.model';

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
  /*   colonySelected: number;
   */
  constructor(public _router: Router, private route: ActivatedRoute,
    public service: ColonyService, public translate: TranslateService) {
    this.router = _router.url;
    this._router = _router;
  }

  ngOnInit(): void {
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

  }


  getAddress(lat: number, lng: number, colony: ColonyModel) {
    this.geoCoder.geocode({ 'location': { lat: lat, lng: lng } }, async (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          if (colony != null) colony.direction = this.address.match(/[^,]+,[^,]+/g);
        } else {
          colony.direction = [this.translate.instant('MAP.NO_ADDRESS'), this.translate.instant('MAP.NO_NUMBER')]
        }
      } else {
        colony.direction = [this.translate.instant('MAP.NO_ADDRESS'), this.translate.instant('MAP.NO_NUMBER')]
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

}
