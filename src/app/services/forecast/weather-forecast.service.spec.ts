import { TestBed } from '@angular/core/testing';

import { WeatherForecastService } from './weather-forecast.service';
import { WeatherApiService } from '@services/api/weather-api.service';
import { OpenWeatherMapDevService } from '@services/api/open-weather-map/open-weather-map-dev.service';
import { provideHttpClient } from '@angular/common/http';

describe('WeatherForecastService', () => {
  let service: WeatherForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WeatherApiService, useClass: OpenWeatherMapDevService },
        provideHttpClient(),
      ],
    });
    service = TestBed.inject(WeatherForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
