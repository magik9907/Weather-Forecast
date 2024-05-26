import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { WeatherApiService } from '@services/api/weather-api.service';
import { env } from '@env/env';
import { OpeanWeatherMapDevService } from '@services/api/open-weather-map/opean-weather-map-dev.service';
import { OpeanWeatherMapService } from '@services/api/open-weather-map/opean-weather-map.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimationsAsync(),
    {
      provide: WeatherApiService,
      useClass: env.production
        ? OpeanWeatherMapService
        : OpeanWeatherMapDevService,
    },
  ],
};
