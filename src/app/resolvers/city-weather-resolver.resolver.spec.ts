import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cityWeatherResolverResolver } from './city-weather-resolver.resolver';
import { CityWeather } from '@/types';

describe('cityWeatherResolverResolver', () => {
  const executeResolver: ResolveFn<CityWeather> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      cityWeatherResolverResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
