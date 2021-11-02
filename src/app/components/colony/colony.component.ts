import { Component, OnInit } from '@angular/core';
import { ColonyService } from '@app/services/colony.service';
import { ColonyModel } from '@app/model/colony.model';
import { TokenStorageService } from '@app/services/token-storage.service';


@Component({
  selector: 'app-colony',
  templateUrl: './colony.component.html',
  styleUrls: ['./colony.component.css']
})
export class ColonyComponent implements OnInit {

  colonies: ColonyModel[] = [];

  isLoggedIn: boolean = false;

  currentUser: any = ''

  constructor(
    public service: ColonyService, private tokenStorage: TokenStorageService) { 

    }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.getColonies();
    
  }

  getColonies(): void {
    this.service.getColonies().subscribe((resp: any) => {
      this.colonies = resp;
      console.log(this.colonies);
    });
  }

}
