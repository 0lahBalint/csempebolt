import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice',
  standalone: true
})
export class DiscountPricePipe implements PipeTransform {
  transform(originalPrice: number, discount: number): string {
    if (!discount || discount <= 0) {
      return '';
    }
    
    const discountedPrice = originalPrice * (1 - discount);
    return `-${(discount * 100).toFixed(0)}% (${this.formatCurrency(discountedPrice)})`;
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}