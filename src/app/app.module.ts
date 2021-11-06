import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MapComponent } from './components/map/map.component';
import { ColonyComponent } from './components/colony/colony.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ColonyFormComponent } from './components/colony-form/colony-form.component';
import { FeedingnComponent } from './components/feeding/feeding.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent,
    ColonyComponent,
    ColonyFormComponent,
    FeedingnComponent,
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
    GoogleMapsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
