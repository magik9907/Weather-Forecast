import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { WeatherApiService } from '@services/api/weather-api.service';
import { City } from '@/types';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  weatherApi = inject(WeatherApiService);
  city = signal<City | null>(null);
  cityInput = signal<string>('');
  filteredOptions = computed(() =>
    this.weatherApi.searchCity(this.cityInput())
  );
  route = inject(Router);
  cityNotSelectedError = signal(false);
  onSearch() {
    if (this.city())
      this.route.navigate([
        'weather',
        'country',
        this.city()?.country,
        'state',
        this.city()?.state,
        'city',
        this.city()?.name,
      ]);
    else {
      this.cityNotSelectedError.set(true);
    }
  }

  setInput(event: string | City) {
    if (typeof event == 'object') {
      const city = event as City;
      this.cityInput.set(`${city.name},${city.state},${city.country}`);
      this.city.set(event);
      this.weatherApi.updateCity(city);
      this.cityNotSelectedError.set(false);
    } else {
      this.cityInput.set(event as string);
      this.city.set(null);
    }
  }
}
