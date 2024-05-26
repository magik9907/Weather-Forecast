import {
  City,
  CityWeather,
  WeatherIcon,
} from '@/types';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppService } from '@services/app/app.service';
import { Observable } from 'rxjs';

export abstract class WeatherApiService {
  protected appService = inject(AppService);
  protected httpClient = inject(HttpClient);
  abstract iconsMap: Record<string, WeatherIcon>;

  private getUnit() {
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
  abstract getCityWeatherByString(
    city: string,
    state: string,
    country: string
  ): Observable<CityWeather>;
  abstract searchCity(city: string): Observable<City[]>;

  abstract getCityWeather(city: City): Observable<CityWeather>;

  abstract getIconLink(key: string): string;
  abstract updateCity(city: City): void;
}
