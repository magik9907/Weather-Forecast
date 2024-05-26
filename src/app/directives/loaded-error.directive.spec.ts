import { Component, DebugElement, signal } from '@angular/core';
import { LoadedErrorDirective } from './loaded-error.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
@Component({
  standalone: true,
  template: `
    <img
      src="http://invalid"
      [appLoadedError]
      alt=""
      (appLoadedError)="onImgLoadError()"
    />
    <img src="http://invalid2" alt="" />
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
    dir.onLoad({ type: 'error' } as any); //eslint-disable-line
    expect(dir.appLoadedError.emit).toHaveBeenCalledWith(true);
  });

  it('should directive return false on output', () => {
    const dir = des[0].injector.get(
      LoadedErrorDirective
    ) as LoadedErrorDirective;
    spyOn(dir.appLoadedError, 'emit');
    dir.onLoad({ type: 'success' } as any); //eslint-disable-line
    expect(dir.appLoadedError.emit).toHaveBeenCalledWith(false);
  });
});
