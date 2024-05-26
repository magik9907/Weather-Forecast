import { CityWeather } from '@/types';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { WeatherApiService } from '@services/api/weather-api.service';

export const cityWeatherResolverResolver: ResolveFn<CityWeather> = (
  route,
  state // eslint-disable-line
) => {
  return inject(WeatherApiService).getCityWeatherByString(
    route.paramMap.get('cityName') || '',
    route.paramMap.get('state') || '',
    route.paramMap.get('country') || ''
  );
};
