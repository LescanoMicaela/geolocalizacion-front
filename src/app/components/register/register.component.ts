import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  constructor(private authService: AuthService, private router: Router,public translate: TranslateService) { 
    this.translate = translate;}

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        Swal.fire({  
          icon: 'success',  
          title: 'Usuario/a registrado/a',  
          text:  'Se han guardado los datos correctamente',  
        }) 
      },
      err => {
        console.log(err)
        this.translate.get(`${err.error.message}`)
        .subscribe( (text) => this.errorMessage = text);

        this.isSignUpFailed = true;
        Swal.fire({
          title: 'Error',
          text:  this.errorMessage,  
          icon: 'error'
        })
      });
  }


}
