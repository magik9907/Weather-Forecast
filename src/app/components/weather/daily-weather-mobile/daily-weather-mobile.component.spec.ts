import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWeatherMobileComponent } from './daily-weather-mobile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('DailyWeatherMobileComponent', () => {
  let component: DailyWeatherMobileComponent;
  let fixture: ComponentFixture<DailyWeatherMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyWeatherMobileComponent],
      providers: [provideAnimationsAsync('noop')],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyWeatherMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
