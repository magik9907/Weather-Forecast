import { TestBed } from '@angular/core/testing';

import { OpeanWeatherMapService } from './opean-weather-map.service';
import { provideHttpClient } from '@angular/common/http';
import { OpeanWeatherMapDevService } from './opean-weather-map-dev.service';

describe('OpeanWeatherMapService', () => {
  let service: OpeanWeatherMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OpeanWeatherMapService,
          useClass: OpeanWeatherMapDevService,
        },
        provideHttpClient(),
      ],
    });
    service = TestBed.inject(OpeanWeatherMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
