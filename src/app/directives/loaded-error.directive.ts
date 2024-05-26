import { Directive, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appLoadedError]',
  standalone: true,
})
export class LoadedErrorDirective {
  appLoadedError = output<boolean>();
  @HostListener('error', ['$event'])
  onLoad(event: Event) {
    this.appLoadedError.emit(event.type === 'error');
  }
}
