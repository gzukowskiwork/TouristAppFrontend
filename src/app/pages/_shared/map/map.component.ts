import { Component, OnInit } from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import {toStringXY} from 'ol/coordinate';
import {toLonLat} from 'ol/proj';
import Overlay from 'ol/Overlay';
import VectorLayer from 'ol/layer/Vector';
import {ShowButtonService} from '../../../_core/services/show-button.service';
import {CoordinatesService} from '../../../_core/services/coordinates.service/coordinates.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map;
  hdms: string;
  layer: VectorLayer;
  showButton: string;

  private static createOverlay(container: HTMLElement): Overlay {
    return new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
  }

  constructor( private showButtonService: ShowButtonService,
               private coordinateService: CoordinatesService) { }

  ngOnInit(): void {
    this.initializeMap();
    this.showButtonService.infoFromRoute.subscribe(
      (show: string) => {
        this.showButton = show;
      }
    );
  }

  initializeMap(): void {

    const container = document.getElementById('popup');
    const closer = document.getElementById('popup-closer');
    const content = document.getElementById('popup-content');
    const overlay = MapComponent.createOverlay(container);

    this.closeCoordinatesPopup(closer, overlay);

    this.setMapProperties(overlay);

    this.showCoordinatePopup(content, overlay);
  }

  private setMapProperties(overlay: Overlay): void {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      overlays: [overlay],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
    });
  }

  private showCoordinatePopup(content: HTMLElement, overlay: Overlay): void {
    this.map.on('singleclick', (evt) => {
      const coordinate = evt.coordinate;
      this.hdms = toStringXY(toLonLat(coordinate), 6);
      overlay.setPosition(coordinate);
      content.innerHTML = '<p>Współrzędne kliknięcia: </p><code>' + this.hdms + '</code>';
    });
  }

  private closeCoordinatesPopup(closer: HTMLElement, overlay: Overlay): void {
    closer.onclick = () => {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };
  }

  onShowWeatherForecast(): void {
    this.coordinateService.coordsFromService.next(this.hdms);
    this.coordinateService.showCoordsFromService.next(true);
  }

  onShowAddPlace(): void {
    this.coordinateService.coordsFromService.next(this.hdms);
  }

  onHideForecast(): void {
    this.coordinateService.showCoordsFromService.next(false);
  }
}
