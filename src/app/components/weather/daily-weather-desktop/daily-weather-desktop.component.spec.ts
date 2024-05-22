import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWeatherDesktopComponent } from './daily-weather-desktop.component';

describe('DailyWeatherDesktopComponent', () => {
  let component: DailyWeatherDesktopComponent;
  let fixture: ComponentFixture<DailyWeatherDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyWeatherDesktopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyWeatherDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
