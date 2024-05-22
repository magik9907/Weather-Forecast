import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find h1 with content "Weather Forecast"', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const h1Header = fixture.debugElement.query(By.css('h1'));
    expect(h1Header).toBeTruthy();
    expect(h1Header.nativeElement.textContent).toBe('Weather Forecast');
  });

  it('should find h1 with link to main page', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const anchorEl = fixture.debugElement.query(By.css('h1 a'));
    expect(anchorEl).toBeTruthy();
    expect(anchorEl.nativeElement.href).toBe('');
  });
});
