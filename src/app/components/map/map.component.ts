import { BoundTextAst } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core'
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { ColoniaModel } from 'src/app/model/colonia.model';
import { ColoniaComponent } from '../colonia/colonia.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild(GoogleMap)
  map!: GoogleMap;
  @ViewChild('mapSearchField')
  searchField!: ElementRef;

  imageSrc = 'assets/images/cat-black-face.png'  
  imageAlt = 'cat icon'

  @Input()
  colonias: ColoniaModel[] = [];

  geoCoder = new google.maps.Geocoder;
  address: string = '';
  zoom: number = 20;
  center: any;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    maxZoom: 20,
    minZoom: 8,
  }
  markers: any[] = [];
  infoContent = '';


  constructor() { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.addMarker(position.coords.latitude,position.coords.longitude )
    })

  }


  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['colonias']) {
      this.colonias.forEach(
        c => {
          this.addMarker(c.latitud,c.longitud)
          this.getAddress(c.latitud,c.longitud, c);
          console.log(this.address)
       } )
    }

 
  }

  ngAfterViewInit(): void {
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement,
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField.nativeElement,
    );


    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      console.log(bounds)
      places.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      console.log(bounds);
      let ne = bounds.getNorthEast(); // Coords of the northeast corner
      let sw = bounds.getSouthWest(); // Coords of the southwest corner
      let nw = new google.maps.LatLng(ne.lat(), sw.lng()); // Coords of the NW corner
      let se = new google.maps.LatLng(sw.lat(), ne.lng()); // Coords of the SE corner
      console.log(ne.toString(), sw.toString(), nw.toString(), se.toString());
      this.map.fitBounds(bounds);
      console.log(bounds.getCenter());
      console.log(this.map.data);
    })


  };


  getAddress(latitude: number, longitude: number, colonia: ColoniaModel) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          console.log(results[0])
          this.address = results[0].formatted_address;
          if (colonia != null)
          colonia.direccion = this.address.match(/[^,]+,[^,]+/g);
          console.log( colonia.direccion );
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  getBounds(markers: any) {
    let north;
    let south;
    let east;
    let west;

    for (const marker of markers) {
      // set the coordinates to marker's lat and lng on the first run.
      // if the coordinates exist, get max or min depends on the coordinates.
      north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
      south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
      east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
      west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
    };

    const bounds = { north, south, east, west };

    return bounds;
  }



  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  addMarker(lat: number, long: number) {
    this.markers.push({
      position: {
        lat: lat,
        lng: long,
      }
    })
  }


}
