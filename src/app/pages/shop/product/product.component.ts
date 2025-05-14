import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DiscountPricePipe } from '../../../pipes/discount-price.pipe';

@Component({
  selector: 'app-product',
  imports: [CommonModule, DiscountPricePipe],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: any;
  @Output() addToCartEvent = new EventEmitter<any>();

  onAddToCart() {
    this.addToCartEvent.emit(this.product);
  }
}