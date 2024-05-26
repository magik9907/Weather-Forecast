import { CityWeather, WeekWeatherForecast } from '@/types';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { WeatherChartsComponent } from '@components/weather-charts/weather-charts.component';
import { PurePipe } from '@pipes/pure.pipe';

@Component({
  selector: 'app-week-weather',
  standalone: true,
  imports: [PurePipe, WeatherChartsComponent, MatButtonModule],
  templateUrl: './week-weather.component.html',
  styleUrl: './week-weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekWeatherComponent {
  data = input.required<CityWeather>();
  selectedInfo = signal('temperature_day');

  getWeekStatsForKey(
    key: string,
    data: WeekWeatherForecast
  ): { key: Date; value: number }[] {
    return data
      .map((v: any) => {
        return { key: v.date, value: v[key] };
      })
      .slice(0, 7);
  }
}
