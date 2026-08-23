import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianNumber',
  standalone: true
})
export class PersianNumberPipe implements PipeTransform {

  transform(value: number | string | null | undefined): string {

    if (value === null || value === undefined) {
      return '';
    }

    // تبدیل به عدد و جدا کردن سه‌تایی
    const formattedNumber = Number(value).toLocaleString('en-US');

    // تبدیل ارقام انگلیسی به فارسی
    return formattedNumber.replace(
      /\d/g,
      digit => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]
    );
  }
}