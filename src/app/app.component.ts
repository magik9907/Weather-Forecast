import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppService } from '@services/app/app.service';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy, OnInit {
  appService = inject(AppService);
  subscription = fromEvent<Event>(window, 'resize')
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe((event) => {
      this.updateView((event.target as Window).innerWidth);
    });

  ngOnInit(): void {
    this.updateView(window.innerWidth);
  }

  ngOnDestroy(): void {
    this.appService.destroy();
    if (this.subscription) this.subscription.unsubscribe();
  }

  private updateView(width: number) {
    this.appService.isMobileView.next(width < 800);
  }
}
