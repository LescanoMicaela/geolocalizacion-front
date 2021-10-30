import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ColoniaModel } from '../model/colonia.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AlimentacionModel } from '../model/alimentacion.model';
import { ColoniaRequestModel } from '@app/model/coloniaRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ColoniaService {

  private url = "http://localhost:8005/v1"

  constructor(private http: HttpClient) { }


  getColonias(): Observable<any> {
    return this.http.get<ColoniaModel[]>(`${this.url}/colonias`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getColonia(latitud: number, longitud: number): Observable<any> {
    return this.http.get<ColoniaModel>(`${this.url}/colonias?latitud=${latitud}&longitud=${longitud}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getColoniaById(id: number): Observable<any> {
    return this.http.get<ColoniaModel>(`${this.url}/colonia/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveColonia(colonia: ColoniaRequestModel): Observable<any> {
    return this.http.post<ColoniaModel[]>(`${this.url}/colonia`, colonia)
      .pipe(
        catchError(this.handleError)
      );
  }


  getAlimentacion(coloniaId:number): Observable<any> {
    return this.http.get<AlimentacionModel>(`${this.url}/colonia${coloniaId}/alimentacion`)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveAlimentacion(coloniaId:number, alimentacion: AlimentacionModel): Observable<any> {
    return this.http.post<ColoniaModel[]>(`${this.url}/colonia/${coloniaId}/alimentacion`, alimentacion)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }



}
