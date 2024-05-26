import { Component, DebugElement, signal } from '@angular/core';
import { LoadedErrorDirective } from './loaded-error.directive';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
@Component({
  standalone: true,
  template: `
    <img
      src="http://invalid"
      [appLoadedError]
      (appLoadedError)="onImgLoadError()"
    />
    <img src="http://invalid2" />
  `,
  imports: [LoadedErrorDirective],
})
class TestComponent {
  imgLoadError = signal(false);
  onImgLoadError() {
    this.imgLoadError.set(true);
  }
}
describe('LoadedDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [LoadedErrorDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(LoadedErrorDirective));
  });

  it('should have one img element with directive', () => {
    expect(des.length).toBe(1);
  });

  it('should directive return true on output', () => {
    const dir = des[0].injector.get(
      LoadedErrorDirective
    ) as LoadedErrorDirective;
    spyOn(dir.appLoadedError, 'emit');
    dir.onLoad({ type: 'error' } as any);
    expect(dir.appLoadedError.emit).toHaveBeenCalledWith(true);
  });

  it('should directive return false on output', () => {
    const dir = des[0].injector.get(
      LoadedErrorDirective
    ) as LoadedErrorDirective;
    spyOn(dir.appLoadedError, 'emit');
    dir.onLoad({ type: 'success' } as any);
    expect(dir.appLoadedError.emit).toHaveBeenCalledWith(false);
  });
});
