import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OpenAqServiceService {

  private apiUrl = 'https://api.openaq.org/v1/';

  constructor(private http: HttpClient) { }

  getCountryData(country): Observable<any>{
    return this.http.get(this.apiUrl + 'measurements?country=' + country);
  }

  getAllCountry(): Observable<any>{
    return this.http.get(this.apiUrl + 'countries');
  }}
