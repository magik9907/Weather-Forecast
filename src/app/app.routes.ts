import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'weather',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    children: [
      {
        path: 'city/:cityName',
        loadComponent: () =>
          import('./pages/city-weather-page/city-weather-page.component').then(
            (m) => m.CityWeatherPageComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/weather',
  },
];
