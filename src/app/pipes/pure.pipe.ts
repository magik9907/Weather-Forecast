import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pure',
  pure: true,
  standalone: true,
})
export class PurePipe implements PipeTransform {
  //eslint-disable-next-line
  transform(value: any, func: (...arg: any) => any, ...args: any[]): any {
    return func(value, ...args);
  }
}
