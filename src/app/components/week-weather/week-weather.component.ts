import { CityWeather, WeekWeatherForecast } from '@/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { WeatherChartsComponent } from '@components/weather-charts/weather-charts.component';
import { PurePipe } from '@pipes/pure.pipe';
import { SpeedPipe } from '@pipes/speed.pipe';
import { TemperaturePipe } from '@pipes/temperature.pipe';

@Component({
  selector: 'app-week-weather',
  standalone: true,
  imports: [
    PurePipe,
    WeatherChartsComponent,
    MatButtonModule,
    TemperaturePipe,
    SpeedPipe,
  ],
  templateUrl: './week-weather.component.html',
  styleUrl: './week-weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekWeatherComponent {
  data = input.required<CityWeather>();
  selectedInfo = signal('temperature_day');

  avgPressure = computed(() => {
    const week = this.data().week;
    const sum = week.reduce((buff, next) => buff + next.pressure, 0);
    return sum / week.length;
  });

  avgTemperature = computed(() => {
    const week = this.data().week;
    const sum = week.reduce((buff, next) => buff + next.temperature_day, 0);
    return sum / week.length;
  });
  avgWind = computed(() => {
    const week = this.data().week;
    const sum = week.reduce((buff, next) => buff + next.wind, 0);
    return sum / week.length;
  });

  getWeekStatsForKey(
    key: string,
    data: WeekWeatherForecast
  ): { key: Date; value: number }[] {
    return (
      data
        //eslint-disable-next-line
        .map((v: any) => {
          return { key: v.date, value: v[key] };
        })
        .slice(0, 7)
    );
  }
}
