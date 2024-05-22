import { Injectable, computed, signal } from '@angular/core';
import { TemperatureMetrics } from '../../../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  selectedMetric = signal<TemperatureMetrics>('metric');
  isMobileView = new BehaviorSubject(false);

  destroy() {
    this.isMobileView.complete();
  }
}
