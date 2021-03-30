import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CurrentWeatherModel} from '../../models/current-weather-model';
import {MyConstants} from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class HttpWeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: string, lon: string): Observable<object>{
    return this.http.get<CurrentWeatherModel>(
      MyConstants.weatherBaseUrl + 'weather?lat=' + lat + '&lon=' + lon + '&appid=' + MyConstants.apiKey + '&units=' + MyConstants.units);
  }

  getForecastFiveDaysThreeHours(lat: string, lon: string): Observable<object>{
    return this.http.get(
      MyConstants.weatherBaseUrl + 'forecast?lat=' + lat + '&lon=' + lon + '&appid=' + MyConstants.apiKey + '&units=' + MyConstants.units);
  }
}
