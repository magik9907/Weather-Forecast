import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { WeatherApiService } from '@services/api/weather-api.service';
import { env } from '@env/env';
import { OpenWeatherMapDevService } from '@services/api/open-weather-map/open-weather-map-dev.service';
import { OpenWeatherMapService } from '@services/api/open-weather-map/open-weather-map.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimationsAsync(),
    {
      provide: WeatherApiService,
      useClass: env.enable_http_client
        ? OpenWeatherMapService
        : OpenWeatherMapDevService,
    },
  ],
};
