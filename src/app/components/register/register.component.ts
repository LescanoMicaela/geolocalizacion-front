import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';
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
          title: this.translate.instant('SIGNUP.REGISTER_SUCCES'),
          text:  this.translate.instant('MODAL.SAVED'),
        })
      },
      err => {
        console.log(err)
        err.error.message ?
        this.translate.get(`${err.error.message}`)
        .subscribe(
           (text) => this.errorMessage = text
        ) : this.getGeneralError();

        this.isSignUpFailed = true;
        Swal.fire({
          title: 'Error',
          text:  this.errorMessage ,
          icon: 'error'
        })
      });
  }

  getGeneralError(){
    this.errorMessage = this.translate.instant('GENERAL_ERROR');
  }


}
