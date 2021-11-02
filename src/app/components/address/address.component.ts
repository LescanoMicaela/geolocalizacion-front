import { Component, OnInit } from '@angular/core';
import { ColonyService } from '@app/services/colony.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private colonyService: ColonyService) { }

  ngOnInit(): void {
    this.colonyService.getColonies()
    .subscribe( resp => {
      console.log(resp)
    })
  }

}
