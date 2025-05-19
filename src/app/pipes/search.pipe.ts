import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'productSearch',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(products: any[], searchTerm: string): any[] {
    if (!products || !searchTerm) {
      return products;
    }

    const term = searchTerm.toLowerCase();

    return products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      (product.tags && product.tags.some((tag: string) => tag.toLowerCase().includes(term)))
    );
  }
}
