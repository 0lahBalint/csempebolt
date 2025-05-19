import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DiscountPricePipe } from '../../../pipes/discount-price.pipe';
import { OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { Product } from '../../../shared/models/product';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product',
  imports: [CommonModule, DiscountPricePipe, MatButtonModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Output() addToCartEvent = new EventEmitter<Product>();
  @Output() editProductEvent = new EventEmitter<Product>();
  @Output() deleteProductEvent = new EventEmitter<string>();
  private cartSubscription!: Subscription;
  isInCart = false;
  isEditing = false;
  editedProduct!: Product;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    console.log('Termék komponens inicializálva:', this.product.name);

    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.isInCart = items.some(item => item.id === this.product.id);
    });
  }

  ngOnDestroy() {
    console.log('Termék komponens megszűnik:', this.product.name);
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
  onAddToCart() {
    console.log('Kattintás érzékelve');
    this.addToCartEvent.emit(this.product);
  }
  startEditing() {
    this.isEditing = true;
    this.editedProduct = { ...this.product };
  }

  saveChanges() {
    this.editProductEvent.emit(this.editedProduct);
    this.isEditing = false;
  }

  cancelEditing() {
    this.isEditing = false;
    this.editedProduct = { ...this.product };
  }

  onDelete() {
    this.deleteProductEvent.emit(this.product.id);
  }
}