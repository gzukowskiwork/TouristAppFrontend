import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Place} from '../../models/place';
import {MyConstants} from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class HttpPlaceService {
  deleteOperationSuccessful: Subject<boolean> = new Subject<boolean>();
  createOperationSuccessful: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  get deleteOperationSuccessfulObservable(): Observable<boolean>{
    return this.deleteOperationSuccessful.asObservable();
  }

  get createOperationSuccessfulObservable(): Observable<boolean>{
    return this.createOperationSuccessful.asObservable();
  }

  getPlaces(route: string): Observable<object>{
    return this.http.get<Place>(this.createRoute(MyConstants.placeBaseUrl, route));
  }

  getPlaceById(route: string, id: number): Observable<object>{
    return this.http.get<Place>(this.createRouteWithParam(MyConstants.placeBaseUrl, route, id));
  }

  deletePlace(route: string, id: number): Observable<object>{
    return this.http.delete(this.createRouteWithParam(MyConstants.placeBaseUrl, route, id));
  }

  updatePlace(route: string, place: Place): Observable<object>{
    return this.http.put(this.createRouteWithParam(MyConstants.placeBaseUrl, route, place.id), place );
  }

  createPlace(route: string, place: Place): Observable<object>{
    return this.http.post(this.createRoute(MyConstants.placeBaseUrl, route), place);
  }

  private createRoute(baseAddress: string, route: string): string {
    return `${baseAddress}/${route}`;
  }

  private createRouteWithParam(baseAddress: string, route: string, id): string {
    return `${baseAddress}/${route}/${id}`;
  }
}
