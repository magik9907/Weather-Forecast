import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LoadedErrorDirective } from '@directives/loaded-error.directive';
import { WeatherApiService } from '@services/api/weather-api.service';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [MatIconModule, LoadedErrorDirective],
  templateUrl: './weather-icon.component.html',
  styleUrl: './weather-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherIconComponent {
  icon = input.required<string>();
  label = input.required<string>();
  title = computed(() => `Expected weather: ${this.label()}`);
  imgLoadError = signal(false);
  apiService = inject(WeatherApiService);
  mapIcon(isLink: boolean) {
    return this.apiService.mapIcon(this.icon(), isLink);
  }

  onImgLoadError() {
    this.imgLoadError.set(true);
  }
}
