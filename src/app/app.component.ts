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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Message } from '@/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy, OnInit {
  private appService = inject(AppService);
  private snackback = inject(MatSnackBar);
  subscription = fromEvent<Event>(window, 'resize')
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe((event) => {
      this.updateView((event.target as Window).innerWidth);
    });

  ngOnInit(): void {
    this.updateView(window.innerWidth);
    this.subscription.add(
      this.appService.messageSubject.subscribe((message) => {
        this.snackback.open(this.getSnackBarMessage(message), 'Ok', {});
      })
    );
  }

  ngOnDestroy(): void {
    this.appService.destroy();
    if (this.subscription) this.subscription.unsubscribe();
  }

  private updateView(width: number) {
    this.appService.isMobileViewSubject.next(width < 800);
  }

  private getSnackBarMessage({ message, code }: Message): string {
    switch (code) {
      case 401:
      case 400:
      case 404:
        return `Cannot fetch data from server (status ${code}). Please contact with adminstrator.`;
      case 429:
      case 430:
      default:
        return message || 'Unexpected error, please try again leter';
    }
  }
}
