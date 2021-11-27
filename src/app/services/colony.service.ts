import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ColonyModel } from '../model/colony.model';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { FeedingModel } from '../model/feeding.model';
import { ColonyRequestModel } from '@app/model/colonyRequest.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from '../../environments/environment';

import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class ColonyService {

   url = environment.apiBaseURL+"/v1";


  constructor(private http: HttpClient, public translate: TranslateService) {
    this.translate = translate;
    this.handleError = this.handleError.bind(this);

  }


  getColonies(): Observable<any> {
    return this.http.get<ColonyModel[]>(`${this.url}/colonies`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getColony(lat: number, lng: number): Observable<any> {
    return this.http.get<ColonyModel>(`${this.url}/colonies?lat=${lat}&lng=${lng}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getColonyById(id: number): Observable<any> {
    return this.http.get<ColonyModel>(`${this.url}/colony/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveColony(colony: ColonyRequestModel): Observable<any> {
    return this.http.post<ColonyModel[]>(`${this.url}/colony`, colony)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateColony(id: number, colony: ColonyRequestModel): Observable<any> {
    return this.http.put<ColonyModel[]>(`${this.url}/colony/${id}`, colony)
      .pipe(
        catchError(this.handleError)
      );
  }

  getFeeding(colonyId: number): Observable<any> {
    return this.http.get<FeedingModel>(`${this.url}/colony/${colonyId}/feeding`)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveFeeding(colonyId: number, alimentacion: FeedingModel): Observable<any> {
    return this.http.post<ColonyModel[]>(`${this.url}/colony/${colonyId}/feeding`, alimentacion)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }


  handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      let errorMessage = '';
      errorMessage = error.error.message ? error.error.message : error.error.error;
      this.translate.get(`${errorMessage}`)
        .subscribe((text) => errorMessage = text);


      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      })
    }
    return throwError(
      this.translate.instant('GENERAL_ERROR'));
  }




}
