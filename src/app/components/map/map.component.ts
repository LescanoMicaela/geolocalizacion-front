import { BoundTextAst } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

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
      console.log(position);
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
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
      console.log(places);
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
      this.map.fitBounds(bounds);
    })

  };


  zoomIn() {
    if (this.options != null && this.options.maxZoom != null)
      if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    console.log(this.zoom)

    if (this.options != null && this.options.minZoom != null)
      if (this.zoom > this.options.minZoom) this.zoom--
    console.log(this.zoom)
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    })
  }


}
