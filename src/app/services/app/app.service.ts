import { Injectable, signal } from '@angular/core';
import { Message, TemperatureMetrics } from '@/types';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  selectedMetric = signal<TemperatureMetrics>('metric');
  metricSubject = new Subject<TemperatureMetrics>();
  isMobileViewSubject = new BehaviorSubject(false);
  messageSubject = new Subject<Message>();
  private subscription = new Subscription();
  constructor() {
    this.subscription.add(
      this.metricSubject.subscribe((v) => {
        this.selectedMetric.set(v);
      })
    );
  }

  destroy() {
    this.isMobileViewSubject.complete();
    this.metricSubject.complete();
    this.subscription.unsubscribe();
    this.messageSubject.complete();
  }
}
