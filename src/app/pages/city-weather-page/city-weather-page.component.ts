import { AsyncPipe, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { DailyWeatherDesktopComponent } from '@components/weather/daily-weather-desktop/daily-weather-desktop.component';
import { DailyWeatherMobileComponent } from '@components/weather/daily-weather-mobile/daily-weather-mobile.component';
import { AppService } from '@services/app/app.service';

@Component({
  selector: 'app-city-weather-page',
  standalone: true,
  imports: [
    UpperCasePipe,
    DailyWeatherMobileComponent,
    DailyWeatherDesktopComponent,
    AsyncPipe,
  ],
  templateUrl: './city-weather-page.component.html',
  styleUrl: './city-weather-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityWeatherPageComponent {
  appService = inject(AppService);
  cityName = input('');
  selectedDate = signal(new Date());

  get isMobile() {
    return this.appService.isMobileView;
  }
}
