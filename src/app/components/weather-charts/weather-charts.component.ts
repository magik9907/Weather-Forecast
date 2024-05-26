import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LineChartComponent } from '@components/charts/line-chart/line-chart.component';

@Component({
  selector: 'app-weather-charts',
  standalone: true,
  imports: [MatButtonModule, LineChartComponent],
  templateUrl: './weather-charts.component.html',
  styleUrl: './weather-charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherChartsComponent {
  data = input.required<{ [key: string]: any }[]>();
  keyName = input.required<string>();
  selectedInfo = signal('temperature_day');

  mapToKeyMap() {
    return this.data().map((v) => {
      return {
        key: v[this.keyName()],
        value: (v as { [key: string]: any })[this.selectedInfo()],
      };
    });
  }
}
