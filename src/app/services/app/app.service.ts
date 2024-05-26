import { Injectable, signal } from '@angular/core';
import { TemperatureMetrics } from '../../../types';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  selectedMetric = signal<TemperatureMetrics>('metric');
  metric$ = new Subject<TemperatureMetrics>();
  isMobileView = new BehaviorSubject(false);
  private subscription = new Subscription();
  constructor() {
    this.subscription.add(
      this.metric$.subscribe((v) => {
        this.selectedMetric.set(v);
      })
    );
  }

  destroy() {
    this.isMobileView.complete();
    this.metric$.complete();
    this.subscription.unsubscribe();
  }
}
