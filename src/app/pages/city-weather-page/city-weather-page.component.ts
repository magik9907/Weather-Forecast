import { CityWeather } from '@/types';
import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineChartComponent } from '@components/charts/line-chart/line-chart.component';
import { DailyWeatherComponent } from '@components/daily-weather/daily-weather.component';
import { WeekWeatherComponent } from '@components/week-weather/week-weather.component';
import { PurePipe } from '@pipes/pure.pipe';
import { WeatherApiService } from '@services/api/weather-api.service';
import { AppService } from '@services/app/app.service';
import { Subscription, mergeMap } from 'rxjs';

@Component({
  selector: 'app-city-weather-page',
  standalone: true,
  imports: [
    UpperCasePipe,
    DailyWeatherComponent,
    LineChartComponent,
    PurePipe,
    WeekWeatherComponent,
  ],
  templateUrl: './city-weather-page.component.html',
  styleUrl: './city-weather-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityWeatherPageComponent implements OnInit, OnDestroy {
  data = signal<CityWeather | null>(null);
  subscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private weatherApi: WeatherApiService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.data.subscribe((d) => {
      this.data.set(d['weather']);
    });
    this.subscription.add(
      this.appService.metricSubject
        .pipe(
          mergeMap(() => {
            return this.weatherApi.getCityWeather(this.data()!.geolocation);
          })
        )
        .subscribe((v) => {
          this.data.set(v);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
