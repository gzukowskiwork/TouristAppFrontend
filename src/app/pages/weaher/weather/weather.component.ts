import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {ShowButtonService} from '../../../_core/services/show-button.service';
import {CoordinatesService} from '../../../_core/services/coordinates.service/coordinates.service';
import {HttpWeatherService} from '../../../_core/services/http.services/http-weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  info: string;
  coordinates: string;
  showWeather: boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private showButtonService: ShowButtonService,
              private coordinateService: CoordinatesService
              ) { }

  ngOnInit(): void {
    this.activatedRoute.data
      .subscribe(
      (data: Data) => {
        this.info = data['msg'];
      }
    );

    this.showButtonService.infoFromRoute.next(this.info);

    this.coordinateService.coordsFromService
      .subscribe(
        (coords: string) => {
          this.coordinates = coords;
        }
      );

    this.coordinateService.showCoordsFromService.subscribe(
      (show: boolean) => {
        this.showWeather = show;
      }
    );
  }

  ngOnDestroy(): void {
    this.showButtonService.infoFromRoute.next('');
  }

}
