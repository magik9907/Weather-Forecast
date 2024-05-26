import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityWeatherPageComponent } from './city-weather-page.component';
import { WeatherApiService } from '@services/api/weather-api.service';
import { OpeanWeatherMapDevService } from '@services/api/open-weather-map/opean-weather-map-dev.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from '@/app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('CityWeatherPageComponent', () => {
  let component: CityWeatherPageComponent;
  let fixture: ComponentFixture<CityWeatherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityWeatherPageComponent],
      providers: [
        { provide: WeatherApiService, useClass: OpeanWeatherMapDevService },
        provideAnimationsAsync('noop'),
        provideRouter(routes),
        provideHttpClient(),
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
