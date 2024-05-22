import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-daily-weather-desktop',
  standalone: true,
  imports: [],
  templateUrl: './daily-weather-desktop.component.html',
  styleUrl: './daily-weather-desktop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyWeatherDesktopComponent {

}
