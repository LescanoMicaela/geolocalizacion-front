import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { MapComponent } from './components/map/map.component';
import { AddressComponent } from './components/address/address.component';
import { ColoniaComponent } from './components/colonia/colonia.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ColoniaFormComponent } from './components/colonia-form/colonia-form.component';
import { AlimentacionComponent } from './components/alimentacion/alimentacion.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AlertComponent } from './components/alert/alert.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    MapComponent,
    AddressComponent,
    ColoniaComponent,
    ColoniaFormComponent,
    AlimentacionComponent,
    LoginComponent,
    RegistroComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
