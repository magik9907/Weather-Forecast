import { City, CityWeather } from '@/types';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherApiService } from '@services/api/weather-api.service';
import { AppService } from '@services/app/app.service';
import {
  Observable,
  catchError,
  forkJoin,
  iif,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastService {
  private cityWeather = new Map<string, CityWeather>();
  private citiesSearchByKeyMap = new Map<string, City[]>();

  constructor(
    private weatherApiService: WeatherApiService,
    private appService: AppService
  ) {}

  mapIcon(icon: string, isLink: boolean) {
    return this.weatherApiService.mapIcon(icon, isLink);
  }

  updateCity(city: City): void {
    const key = `${city.name},${city.state},${city.country}`.toUpperCase();
    this.citiesSearchByKeyMap.set(key + this.appService.selectedMetric(), [
      city,
    ]);
  }

  searchCity(city: string): Observable<City[]> {
    if (!city) return of([]);
    const upperCaseCity = city.toUpperCase();
    return iif(
      () => {
        return this.citiesSearchByKeyMap.has(
          upperCaseCity + this.appService.selectedMetric()
        );
      },
      of(
        this.citiesSearchByKeyMap.get(
          upperCaseCity + this.appService.selectedMetric()
        )!
      ),
      this.weatherApiService.fetchGeolocationForCity(upperCaseCity).pipe(
        map((res) => {
          return res.map<City>((v) => {
            return {
              country: v.country,
              lat: v.lat,
              lon: v.lon,
              name: v.name,
              state: v.state,
            };
          });
        }),
        tap((v) =>
          this.citiesSearchByKeyMap.set(
            upperCaseCity + this.appService.selectedMetric(),
            v
          )
        )
      )
    );
  }

  getCityWeather(city: City): Observable<CityWeather> {
    const key = `${city.name},${city.state},${city.country}`.toUpperCase();
    return iif(
      () => this.cityWeather.has(key + this.appService.selectedMetric()),
      of(this.cityWeather.get(key + this.appService.selectedMetric())!),
      this.fetchData(key, city)
    );
  }

  getCityWeatherByString(
    city: string,
    state: string,
    country: string
  ): Observable<CityWeather> {
    const key = `${city},${state},${country}`.toUpperCase();
    return this.searchCity(key).pipe(
      mergeMap((v) => {
        return this.fetchData(key, v[0]);
      })
    );
  }

  fetchData(key: string, city: City) {
    return of(city).pipe(
      mergeMap<City, Observable<CityWeather>>((cityObj) => {
        return forkJoin({
          geolocation: of(cityObj),
          week: this.weatherApiService.fetch8DaysForecast(
            cityObj.lat,
            cityObj.lon
          ),
          daily: this.weatherApiService.fetch5DaysForecast(
            cityObj.lat,
            cityObj.lon
          ),
        });
      }),
      catchError((e: HttpErrorResponse) => {
        this.appService.messageSubject.next({ code: e.status });
        return [];
      }),
      tap((v) =>
        this.cityWeather.set(key + this.appService.selectedMetric(), v)
      )
    );
  }
}
