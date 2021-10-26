import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@app/services/token-storage.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: any = ''

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    console.log(this.token.getUser())
    let usuario =  this.token.getUser();
    usuario ? this.currentUser = usuario : '';
  }


}
