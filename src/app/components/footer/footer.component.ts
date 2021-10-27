import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@app/services/token-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLoggedIn = false;

  constructor( private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log(this.isLoggedIn)
      this.isLoggedIn = true;
    }
  }

}
