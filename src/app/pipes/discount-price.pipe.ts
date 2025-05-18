import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice',
  standalone: true
})
export class DiscountPricePipe implements PipeTransform {
  transform(price: number, discount: number): number {
    if (!price || !discount) return price;
    return price * (1 - discount);
  }
}