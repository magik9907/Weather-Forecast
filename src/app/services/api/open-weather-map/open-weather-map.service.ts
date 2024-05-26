import {
  City,
  CityWeather,
  SpecificWeatherForecast,
  WeatherIcon,
  WeekWeatherForecast,
} from '@/types';
import { WeatherApiService } from '../weather-api.service';
import {
  Observable,
  catchError,
  delay,
  distinctUntilChanged,
  forkJoin,
  iif,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import {
  Forecast5DaysResponse,
  Forecast8DaysResponse,
  GeolocationResponse,
} from './types';
import moment from 'moment';
import { env } from '@env/env';

export class OpenWeatherMapService extends WeatherApiService {
  private cityWeather = new Map<string, CityWeather>();
  private citiesSearchByKeyMap = new Map<string, City[]>();
  iconsMap: Record<string, WeatherIcon> = {
    '01n': 'clear_night',
    '01d': 'clear_day',
    '02n': 'nights_stay',
    '02d': 'partly_cloudy_day',
    '03n': 'cloud',
    '03d': 'cloud',
    '04n': 'cloud',
    '04d': 'cloud',
    '09n': 'rainy',
    '09d': 'rainy',
    '10n': 'rainy',
    '10d': 'rainy',
    '11n': 'thunderstorm',
    '11d': 'thunderstorm',
    '13n': 'weather_snowy',
    '13d': 'weather_snowy',
    '50n': 'foggy',
    '50d': 'foggy',
  };

  override updateCity(city: City): void {
    const key = `${city.name},${city.state},${city.country}`.toUpperCase();
    this.citiesSearchByKeyMap.set(key + this.appService.selectedMetric(), [
      city,
    ]);
  }

  override searchCity(city: string): Observable<City[]> {
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
      this.fetchGeolocationForCity(upperCaseCity).pipe(
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

  override getCityWeather(city: City): Observable<CityWeather> {
    const key = `${city.name},${city.state},${city.country}`.toUpperCase();
    return iif(
      () => this.cityWeather.has(key + this.appService.selectedMetric()),
      of(this.cityWeather.get(key + this.appService.selectedMetric())!),
      this.fetchData(key, city)
    );
  }

  override getCityWeatherByString(
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

  protected fetchData(key: string, city: City) {
    return of(city).pipe(
      mergeMap<City, Observable<CityWeather>>((cityObj) => {
        return forkJoin({
          geolocation: of(cityObj),
          week: this.fetch8DaysForecast(cityObj.lat, cityObj.lon).pipe(
            this.map8DaysForecast()
          ),
          daily: this.fetch5DaysForecast(cityObj.lat, cityObj.lon).pipe(
            this.map5DaysForecast()
          ),
        });
      }),
      catchError((e: HttpErrorResponse, c) => {
        this.appService.messageSubject.next({ code: e.status });
        return [];
      }),
      tap((v) =>
        this.cityWeather.set(key + this.appService.selectedMetric(), v)
      )
    );
  }

  private initParams() {
    let params = new HttpParams();
    if (env.api_key) params = params.appendAll({ appid: env.api_key });
    return params;
  }

  protected fetchGeolocationForCity(
    city: string
  ): Observable<GeolocationResponse[]> {
    return of(city).pipe(
      delay(500),
      distinctUntilChanged(),
      mergeMap((city) => {
        let params = this.initParams();
        params = params.append('q', city);
        params = params.append('limit', 10);
        return this.httpClient.get<GeolocationResponse[]>(
          `${env.api_url}/geo/1.0/direct`,
          { params }
        );
      }),
      catchError((e: HttpErrorResponse, c) => {
        this.appService.messageSubject.next({ code: e.status });
        return [];
      })
    );
  }

  protected fetch5DaysForecast(
    lat: number,
    lon: number
  ): Observable<Forecast5DaysResponse> {
    let params = this.initParams();
    params = params.appendAll({ lat, lon });
    const metric = this.appService.selectedMetric();
    if (metric) {
      params=params.append('units', metric);
    }
    return this.httpClient.get<Forecast5DaysResponse>(
      `${env.api_url}/data/2.5/forecast`,
      { params }
    );
  }

  protected fetch8DaysForecast(
    lat: number,
    lon: number
  ): Observable<Forecast8DaysResponse> {
    let params = this.initParams();
    params = params.appendAll({ lat, lon,exclude:'current,minutely,hourly,alerts' });
    const metric = this.appService.selectedMetric();
    if (metric) {
      params=params.append('units', metric);
    }

    return this.httpClient.get<Forecast8DaysResponse>(
      `${env.api_url}/data/3.0/onecall`,
      { params }
    );
  }

  override getIconLink(key: string): string {
    return `https://openweathermap.org/img/w/${key}.png`;
  }

  private map5DaysForecast() {
    return map<Forecast5DaysResponse, SpecificWeatherForecast[]>((source) => {
      const objMap = new Map<string, SpecificWeatherForecast>();
      source.list.forEach((s) => {
        const [date, time] = s.dt_txt.split(' ');
        const obj: SpecificWeatherForecast = objMap.get(date) || {
          date,
          hours: [],
          metric: this.appService.selectedMetric(),
        };
        if (!objMap.has(date)) objMap.set(date, obj);

        obj.hours.push({
          date,
          time: time.replace(/(:00)$/, ''),
          clouds: s.clouds.all,
          humidity: s.main.humidity,
          pressure: s.main.pressure,
          temperature_day: s.main.temp,
          wind: s.wind.speed,
          weather: s.weather[0],
        });
      });
      return [...objMap.values()];
    });
  }

  private map8DaysForecast() {
    return map<Forecast8DaysResponse, WeekWeatherForecast>((source) => {
      return source.daily.map((s) => {
        const date = new Date(0);
        date.setSeconds(s.dt);
        const momentDate = moment(date);
        return {
          date: momentDate.format('YYYY-MM-DD'),
          clouds: s.clouds,
          humidity: s.humidity,
          metric: this.appService.selectedMetric(),
          pressure: s.pressure,
          temperature_day: s.temp.day,
          temperature_night: s.temp.night,
          weather: s.weather[0],
          wind: s.wind_speed,
        };
      });
    });
  }
}
