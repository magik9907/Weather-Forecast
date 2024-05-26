import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';
import { TemperaturePipe } from '@pipes/temperature.pipe';
import { AppService } from '@services/app/app.service';
import { CityWeather, SpecificWeatherForecast } from '@/types';
import { PurePipe } from '@pipes/pure.pipe';
import { SpeedPipe } from '@pipes/speed.pipe';
import { WeatherChartsComponent } from '@components/weather-charts/weather-charts.component';

@Component({
  selector: 'app-daily-weather',
  standalone: true,
  imports: [
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    DatePipe,
    WeatherIconComponent,
    TemperaturePipe,
    AsyncPipe,
    PurePipe,
    MatButtonModule,
    SpeedPipe,
    WeatherChartsComponent,
  ],
  templateUrl: './daily-weather.component.html',
  styleUrl: './daily-weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyWeatherComponent {
  weather = input.required<CityWeather>();
  appService = inject(AppService);
  readonly datePattern = `dd-MM-YYYY, EEEE`;
  currentDateIndex = signal(0);

  get dayWeather() {
    return this.weather().week[this.currentDateIndex()];
  }

  changeDate(step: number) {
    this.currentDateIndex.set(this.currentDateIndex() + step);
  }

  get isMobile() {
    return this.appService.isMobileView;
  }

  getWeekDays(week: CityWeather['week']): string[] {
    return week.map((x) => x.date).slice(0, 7);
  }

  getDayForecast(weather: CityWeather, idx: number) {
    return idx < weather.daily.length ? weather.daily[idx].hours : [];
  }
}
