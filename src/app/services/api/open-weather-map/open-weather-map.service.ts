import {
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
  map,
  mergeMap,
  of,
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

  private initParams() {
    let params = new HttpParams();
    if (env.api_key) params = params.appendAll({ appid: env.api_key });
    return params;
  }
  protected makeGeolocationForCityRequest(city: string) {
    let params = this.initParams();
    params = params.append('q', city);
    params = params.append('limit', 10);
    return this.httpClient.get<GeolocationResponse[]>(
      `${env.api_url}/geo/1.0/direct`,
      { params }
    );
  }
  override fetchGeolocationForCity(
    city: string
  ): Observable<GeolocationResponse[]> {
    return of(city).pipe(
      delay(500),
      distinctUntilChanged(),
      mergeMap((city) => this.makeGeolocationForCityRequest(city)),
      catchError((e: HttpErrorResponse) => {
        this.appService.messageSubject.next({ code: e.status });
        return [];
      })
    );
  }

  protected make5DaysForecastRequest(lat: number, lon: number) {
    let params = this.initParams();
    params = params.appendAll({ lat, lon });
    const metric = this.getUnit();
    if (metric) {
      params = params.append('units', metric);
    }
    return this.httpClient.get<Forecast5DaysResponse>(
      `${env.api_url}/data/2.5/forecast`,
      {
        params,
      }
    );
  }

  override fetch5DaysForecast(
    lat: number,
    lon: number
  ): Observable<SpecificWeatherForecast[]> {
    return this.make5DaysForecastRequest(lat, lon).pipe(
      this.map5DaysForecast()
    );
  }

  protected make8DaysForecastRequest(lat: number, lon: number) {
    let params = this.initParams();
    params = params.appendAll({
      lat,
      lon,
      exclude: 'current,minutely,hourly,alerts',
    });
    const metric = this.getUnit();
    if (metric) {
      params = params.append('units', metric);
    }
    return this.httpClient.get<Forecast8DaysResponse>(
      `${env.api_url}/data/3.0/onecall`,
      { params }
    );
  }

  override fetch8DaysForecast(
    lat: number,
    lon: number
  ): Observable<WeekWeatherForecast> {
    return this.make8DaysForecastRequest(lat, lon).pipe(
      this.map8DaysForecast()
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
