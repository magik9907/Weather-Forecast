import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherIconComponent } from './weather-icon.component';
import { OpeanWeatherMapDevService } from '@services/api/open-weather-map/opean-weather-map-dev.service';
import { WeatherApiService } from '@services/api/weather-api.service';
import { provideHttpClient } from '@angular/common/http';

describe('WeatherIconComponent', () => {
  let component: WeatherIconComponent;
  let fixture: ComponentFixture<WeatherIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherIconComponent],
      providers: [
        { provide: WeatherApiService, useClass: OpeanWeatherMapDevService },
        provideHttpClient(),
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
