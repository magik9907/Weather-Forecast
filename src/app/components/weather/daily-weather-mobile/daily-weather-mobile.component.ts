import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-daily-weather-mobile',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './daily-weather-mobile.component.html',
  styleUrl: './daily-weather-mobile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyWeatherMobileComponent {
  readonly datePattern = `dd-MM-YYYY, EEEE`;
  currentDateIndex = signal(0);
  dates = [
    '2024-04-04',
    '2024-04-05',
    '2024-04-06',
    '2024-04-07',
    '2024-04-08',
    '2024-04-09',
  ];
  changeDate(step: number) {
    this.currentDateIndex.set(this.currentDateIndex() + step);
  }
}
