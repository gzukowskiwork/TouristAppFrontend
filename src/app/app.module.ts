import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/_shared/navbar/navbar.component';
import { HeaderComponent } from './pages/_shared/header/header.component';
import { MapComponent } from './pages/_shared/map/map.component';
import { WeatherComponent } from './pages/weaher/weather/weather.component';
import { PlaceComponent } from './pages/place/place/place.component';
import { SharedComponent } from './pages/_shared/shared.component';
import {RouterModule, Routes} from '@angular/router';
import { CreatePlaceComponent } from './pages/place/place/create-place/create-place.component';
import { UpdatePlaceComponent } from './pages/place/place/update-place/update-place.component';
import { LoginComponent } from './pages/_shared/authentication/login/login.component';
import { RegisterComponent } from './pages/_shared/authentication/register/register.component';
import { WeatherChartComponent } from './pages/weaher/weather/weather-chart/weather-chart.component';
import { CurrentWeatherComponent } from './pages/weaher/weather/current-weather/current-weather.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxEchartsModule} from 'ngx-echarts';

const appRoutes: Routes = [
  {path: 'weather', component: WeatherComponent, data: {msg: 'weather'} },
  {path: 'place', component: PlaceComponent, data: {msg: 'place'}, children: [
      {path: 'update', component: UpdatePlaceComponent},
      {path: 'add', component: CreatePlaceComponent}
    ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    MapComponent,
    WeatherComponent,
    PlaceComponent,
    SharedComponent,
    CreatePlaceComponent,
    UpdatePlaceComponent,
    LoginComponent,
    RegisterComponent,
    WeatherChartComponent,
    CurrentWeatherComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
