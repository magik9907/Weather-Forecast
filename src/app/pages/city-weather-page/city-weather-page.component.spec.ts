import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityWeatherPageComponent } from './city-weather-page.component';
import { WeatherApiService } from '@services/api/weather-api.service';
import { OpenWeatherMapDevService } from '@services/api/open-weather-map/open-weather-map-dev.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from '@/app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { WeatherForecastService } from '@services/forecast/weather-forecast.service';

describe('CityWeatherPageComponent', () => {
  let component: CityWeatherPageComponent;
  let fixture: ComponentFixture<CityWeatherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityWeatherPageComponent],
      providers: [
        { provide: WeatherApiService, useClass: OpenWeatherMapDevService },
        provideAnimationsAsync('noop'),
        provideRouter(routes),
        provideHttpClient(),
        WeatherForecastService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CityWeatherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
