import { Routes } from '@angular/router';
import { cityWeatherResolverResolver } from './resolvers/city-weather-resolver.resolver';

export const routes: Routes = [
  {
    path: 'weather',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    children: [
      {
        path: 'country/:country/state/:state/city/:cityName',
        loadComponent: () =>
          import('./pages/city-weather-page/city-weather-page.component').then(
            (m) => m.CityWeatherPageComponent
          ),
        resolve:{weather:cityWeatherResolverResolver}
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/weather',
  },
];
