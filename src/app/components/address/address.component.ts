import { Component, OnInit } from '@angular/core';
import { ColoniaService } from 'src/app/services/colonia.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private coloniaService: ColoniaService) { }

  ngOnInit(): void {
    this.coloniaService.getColonias()
    .subscribe( resp => {
      console.log(resp)
    })
  }

}
