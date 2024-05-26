import { Pipe, PipeTransform } from '@angular/core';
import { AppService } from '@services/app/app.service';

@Pipe({
  name: 'temperature',
  standalone: true,
  pure: false,
})
export class TemperaturePipe implements PipeTransform {
  constructor(private appService: AppService) {}
  transform(value: number): string {
    return `${value} ${this.getSymbol()}`;
  }

  getSymbol() {
    switch (this.appService.selectedMetric()) {
      case 'imperial':
        return '°F';
      case 'kelvin':
        return '°K';
      case 'metric':
        return '°C';
    }
  }
}
