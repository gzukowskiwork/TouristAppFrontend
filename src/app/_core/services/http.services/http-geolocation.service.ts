import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MyConstants} from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class HttpGeolocationService {

  constructor(private http: HttpClient) { }

  getGeocodingName(lat: string, lon: string): Observable<object>{
   return this.http.get<any>(
     MyConstants.geocodingBaseUrl + 'reverse?lat=' + lat + '&lon=' + lon  + '&limit=1' +  '&appid=' + MyConstants.apiKey
   );
  }
}
