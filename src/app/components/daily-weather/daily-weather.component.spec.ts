import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWeatherComponent } from './daily-weather.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { WeatherApiService } from '@services/api/weather-api.service';
import { OpenWeatherMapDevService } from '@services/api/open-weather-map/open-weather-map-dev.service';
import { cityWeather } from '@test/models';

describe('DailyWeatherComponent', () => {
  let component: DailyWeatherComponent;
  let fixture: ComponentFixture<DailyWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyWeatherComponent],
      providers: [
        provideAnimationsAsync('noop'),
        { provide: WeatherApiService, useClass: OpenWeatherMapDevService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyWeatherComponent);
    fixture.componentRef.setInput('weather', cityWeather);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
