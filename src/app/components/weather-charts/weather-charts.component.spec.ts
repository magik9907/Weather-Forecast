import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherChartsComponent } from './weather-charts.component';

describe('WeatherChartsComponent', () => {
  let component: WeatherChartsComponent;
  let fixture: ComponentFixture<WeatherChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherChartsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherChartsComponent);
    fixture.componentRef.setInput('keyName', 'date');
    fixture.componentRef.setInput('data', [
      {
        date: '2021-11-11',
        temperature_day: 3,
        pressure: 3,
        humidity: 1,
        wind: 2,
      },
    ]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
