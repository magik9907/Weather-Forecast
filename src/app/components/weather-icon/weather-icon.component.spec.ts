import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherIconComponent } from './weather-icon.component';
import { OpenWeatherMapDevService } from '@services/api/open-weather-map/open-weather-map-dev.service';
import { WeatherApiService } from '@services/api/weather-api.service';
import { provideHttpClient } from '@angular/common/http';
import { WeatherForecastService } from '@services/forecast/weather-forecast.service';

describe('WeatherIconComponent', () => {
  let component: WeatherIconComponent;
  let fixture: ComponentFixture<WeatherIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherIconComponent],
      providers: [
        { provide: WeatherApiService, useClass: OpenWeatherMapDevService },
        provideHttpClient(),
        WeatherForecastService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherIconComponent);

    fixture.componentRef.setInput('icon', '01d');
    fixture.componentRef.setInput('label', 'sunny');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
