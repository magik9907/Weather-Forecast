import {
  City,
  CityWeather,
  SpecificWeatherForecast,
  WeatherIcon,
  WeekWeatherForecast,
} from '@/types';
import { WeatherApiService } from '../weather-api.service';
import { Observable, forkJoin, iif, map, mergeMap, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Forecast5DaysResponse,
  Forecast8DaysResponse,
  GeolocationResponse,
} from './types';
import moment from 'moment';

export class OpeanWeatherMapService extends WeatherApiService {
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
  constructor(httpClient?: HttpClient) {
    super(httpClient);
  }

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
      tap((v) =>
        this.cityWeather.set(key + this.appService.selectedMetric(), v)
      )
    );
  }

  protected fetchGeolocationForCity(
    city: string
  ): Observable<GeolocationResponse[]> {
    throw 'not imeplemented';
  }

  protected fetch5DaysForecast(
    lat: number,
    lon: number
  ): Observable<Forecast5DaysResponse> {
    throw 'Not implemented';
  }

  protected fetch8DaysForecast(
    lat: number,
    lon: number
  ): Observable<Forecast8DaysResponse> {
    throw 'Not implemented';
  }

  override getIconLink(key: string): string {
    return 'http://invalid' + key;
  }

  private map5DaysForecast() {
    return map<Forecast5DaysResponse, SpecificWeatherForecast[]>((source) => {
      const objMap = new Map<string, SpecificWeatherForecast>();
      source.list.forEach((s) => {
        let [date, time] = s.dt_txt.split(' ');
        time = time.replace(/(:00)$/, '');
        let obj: SpecificWeatherForecast = objMap.get(date) || {
          date,
          hours: [],
          metric: this.appService.selectedMetric(),
        };
        if (!objMap.has(date)) objMap.set(date, obj);

        obj.hours.push({
          date,
          time,
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
