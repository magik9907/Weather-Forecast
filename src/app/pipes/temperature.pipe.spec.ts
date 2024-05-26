import { AppService } from '@services/app/app.service';
import { TemperaturePipe } from './temperature.pipe';

describe('TemperaturePipe', () => {
  it('create an instance', () => {
    const pipe = new TemperaturePipe(new AppService());
    expect(pipe).toBeTruthy();
  });
});
