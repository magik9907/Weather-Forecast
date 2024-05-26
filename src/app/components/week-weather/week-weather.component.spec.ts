import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekWeatherComponent } from './week-weather.component';
import { cityWeather } from '@test/models';

describe('WeekWeatherComponent', () => {
  let component: WeekWeatherComponent;
  let fixture: ComponentFixture<WeekWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekWeatherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekWeatherComponent);
    fixture.componentRef.setInput('data', cityWeather);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
