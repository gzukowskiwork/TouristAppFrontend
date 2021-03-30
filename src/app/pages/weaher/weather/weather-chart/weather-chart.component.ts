import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CoordinatesService} from '../../../../_core/services/coordinates.service/coordinates.service';
import {HttpWeatherService} from '../../../../_core/services/http.services/http-weather.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.css']
})
export class WeatherChartComponent implements OnInit, OnChanges {

  public main1: any;
  public temp: number[] = [];
  public tempFeel: number[] = [];
  public weatherDate: any[] = [];
  public wind: number[] = [];
  public humidity: number[] = [];
  public placeName: string = '';
  temperatureChartOption: EChartsOption;
  windChartOption: EChartsOption;
  humidityChartOption: EChartsOption;

  @Input() coordinates: string;

  constructor(private coordinateService: CoordinatesService,
              private httpWeatherService: HttpWeatherService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.coordinates);
    this.getWeather();
    this.weatherDate = [];
  }

  showCoordinates(): {longitude: string, latitude: string} {
    return this.coordinateService.reverseCoordinatesToLatLon(this.coordinates);
  }

  getWeather(): void {
    const lat = this.showCoordinates().longitude;
    const lon = this.showCoordinates().latitude;

    this.httpWeatherService.getForecastFiveDaysThreeHours(lat, lon)
      .subscribe(x => {
        console.log(x);
        this.main1 = x as any;
        this.temp = x['list'].map(x => x.main.temp);
        this.tempFeel = x['list'].map(x => x.main.feels_like);
        this.wind = x['list'].map(x => x.wind.speed);
        this.humidity = x['list'].map(x => x.main.humidity);
        const dates = x['list'].map(x => x.dt);

        this.DateConversion(dates);
        this.generateTemperatureChart();
        this.generateWindChart();
        this.generateHumidityChart();
      });
  }

  private DateConversion(dates: any): void {
    dates.forEach((x) => {
      const date = new Date(x * 1000);
      this.weatherDate.push(date.toLocaleDateString(
        'pl', {
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric'
        }));
    });
  }

  private formatTitle(): string{
    return ' w miejscu: \n' +
      'szerokość WGS84: ' + this.showCoordinates().latitude +
      '\ndługość WGS84: ' + this.showCoordinates().longitude
      ;
  }

  private generateTemperatureChart(): void {
    this.temperatureChartOption = {
      title: {
        text: 'Temperatury' + this.formatTitle()
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['temperatura', 'minimalna', 'maksymalna', 'odczuwalna']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        // data: this.weatherDate,
        data: this.weatherDate
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.temp,
          type: 'line',
          smooth: true,
          color: 'red'
        },
        {
          data: this.tempFeel,
          type: 'line',
          smooth: true,
          color: 'blue'
        }
      ],

    };
  }
  private generateWindChart(): void {
    this.windChartOption = {

      title: {
        text: 'Siła wiatru' + this.formatTitle()
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.weatherDate,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.wind,
          type: 'line',
          smooth: true,
          color: 'blue'
        },
      ],
    };
  }

  private generateHumidityChart(): void {
    this.humidityChartOption = {
      title: {
        text: 'Wilgotność' + this.formatTitle()
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.weatherDate,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.humidity,
          type: 'line',
          smooth: true,
          color: 'purple'
        }
      ],
    };
    // https://echarts.apache.org/examples/en/editor.html?c=area-stack&theme=light
  }

}
