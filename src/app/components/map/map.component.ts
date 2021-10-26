import { Component, ElementRef, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core'
import { GoogleMap } from '@angular/google-maps'
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
      this.addMarker(position.coords.latitude, position.coords.longitude)
    })
  }


  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['colonias']) {
      this.colonias.forEach(
        c => {
          this.addMarker(c.latitud, c.longitud)
          this.getAddress(c.latitud, c.longitud, c);
        })
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
      if (places.length == 0) {
        return;
      }

      // For each place, get the icon, name and location.
      console.log(places[0].geometry.location.lat)
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

        console.log(place.geometry.location)
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
      console.log(bounds.getCenter().lat())
      console.log(bounds.getCenter().lng())

    });


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
          console.log(colonia.direccion);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  addMarker(lat: number, long: number) {
    this.markers.push({
      position: {
        lat: lat,
        lng: long}
    })
  }


}
