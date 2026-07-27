import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianNumber',
  standalone: true
})
export class PersianNumberPipe implements PipeTransform {

  transform(value: string | number): string {

    return value
      .toString()
      .replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);
  }

}
