import { Pipe, PipeTransform } from '@angular/core';
import { AppService } from '@services/app/app.service';

@Pipe({
  name: 'speed',
  standalone: true,
  pure: false,
})
export class SpeedPipe implements PipeTransform {
  constructor(private appService: AppService) {}
  transform(value: number): string {
    return `${value} ${this.getSymbol()}`;
  }

  getSymbol() {
    switch (this.appService.selectedMetric()) {
      case 'imperial':
        return 'mph';
      case 'kelvin':
        return 'm/s';
      case 'metric':
        return 'm/s';
    }
  }
}
