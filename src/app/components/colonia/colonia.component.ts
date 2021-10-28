import { Component, Input, OnInit } from '@angular/core';
import { ColoniaService } from 'src/app/services/colonia.service';
import { Router } from '@angular/router';
import { ColoniaModel } from 'src/app/model/colonia.model';
import { TokenStorageService } from '@app/services/token-storage.service';


@Component({
  selector: 'app-colonia',
  templateUrl: './colonia.component.html',
  styleUrls: ['./colonia.component.css']
})
export class ColoniaComponent implements OnInit {

  colonias: ColoniaModel[] = [];

  isLoggedIn: boolean = false;

  currentUser: any = ''

  constructor(
    public service: ColoniaService, private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.getColonias();
  }

  getColonias(): void {
    this.service.getColonias().subscribe((resp: any) => {
      this.colonias = resp;
      console.log(this.colonias);
    });
  }

}
