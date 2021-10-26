import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColoniaModel } from '../model/colonia.model';

const API_URL = 'http://localhost:8005/api/test/';
const url = "http://localhost:8005/v1";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getColonias(): Observable<any> {
    return this.http.get<ColoniaModel[]>(`${url}/colonias`)
  }

}
