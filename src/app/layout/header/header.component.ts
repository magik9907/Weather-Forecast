import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AppService } from '@services/app/app.service';
import { TemperatureMetrics } from '@/types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatButtonToggleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  appService = inject(AppService);

  get selectedMetric() {
    return this.appService.selectedMetric();
  }

  set selectedMetric($event: TemperatureMetrics) {
    this.appService.selectedMetric.set($event);
  }
}
