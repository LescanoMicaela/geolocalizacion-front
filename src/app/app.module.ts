import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MapComponent } from './components/map/map.component';
import { AddressComponent } from './components/address/address.component';
import { ColoniaComponent } from './components/colonia/colonia.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ColoniaFormComponent } from './components/colonia-form/colonia-form.component';
import { AlimentacionComponent } from './components/alimentacion/alimentacion.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent,
    AddressComponent,
    ColoniaComponent,
    ColoniaFormComponent,
    AlimentacionComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
