import { TestBed } from '@angular/core/testing';

import { OpeanWeatherMapService } from './opean-weather-map.service';
import { WeatherApiService } from '../WeatherApi.service';

describe('OpeanWeatherMapService', () => {
  let service: WeatherApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WeatherApiService, useClass: OpeanWeatherMapService },
      ],
    });
    service = TestBed.inject(WeatherApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
