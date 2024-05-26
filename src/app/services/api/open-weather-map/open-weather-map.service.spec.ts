import { TestBed } from '@angular/core/testing';

import { OpenWeatherMapService } from './open-weather-map.service';
import { provideHttpClient } from '@angular/common/http';
import { OpenWeatherMapDevService } from './open-weather-map-dev.service';

describe('OpenWeatherMapService', () => {
  let service: OpenWeatherMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OpenWeatherMapService,
          useClass: OpenWeatherMapDevService,
        },
        provideHttpClient(),
      ],
    });
    service = TestBed.inject(OpenWeatherMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
