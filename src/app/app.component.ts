import { Component } from '@angular/core';
import { ColoniaService } from './services/colonia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'geolocalizacion-felina';
  constructor(private coloniaService: ColoniaService) { }

  ngOnInit(): void {
    this.coloniaService.getColonias()
    .subscribe( resp => {
      console.log(resp)
    })
  }


}
