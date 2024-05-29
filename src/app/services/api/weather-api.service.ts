import {
  SpecificWeatherForecast,
  WeatherIcon,
  WeekWeatherForecast,
} from '@/types';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppService } from '@services/app/app.service';
import { Observable } from 'rxjs';
import { GeolocationResponse } from './open-weather-map/types';

export abstract class WeatherApiService {
  protected appService = inject(AppService);
  protected httpClient = inject(HttpClient);
  abstract iconsMap: Record<string, WeatherIcon>;

  protected getUnit() {
    switch (this.appService.selectedMetric()) {
      case 'imperial':
        return 'imperial';
      case 'kelvin':
        return null;
      case 'metric':
        return 'metric';
    }
  }

  mapIcon(key: string, isLink: boolean) {
    return isLink ? this.getIconLink(key) : this.iconsMap[key];
  }

  abstract fetchGeolocationForCity(
    city: string
  ): Observable<GeolocationResponse[]>;

  abstract getIconLink(key: string): string;

  abstract fetch5DaysForecast(
    lat: number,
    lon: number
  ): Observable<SpecificWeatherForecast[]>;

  abstract fetch8DaysForecast(
    lat: number,
    lon: number
  ): Observable<WeekWeatherForecast>;
}
