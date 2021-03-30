import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {ShowButtonService} from '../../../_core/services/show-button.service';
import {CoordinatesService} from '../../../_core/services/coordinates.service/coordinates.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit, OnDestroy {
  info: string;
  coordinates: string;

  constructor(private activatedRoute: ActivatedRoute,
              private showButtonService: ShowButtonService,
              private coordinateService: CoordinatesService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
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
  }

  ngOnDestroy(): void {
    this.showButtonService.infoFromRoute.next('');
  }

}
