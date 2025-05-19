import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CurrencyPipe]
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(
    public cartService: CartService,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) {
    this.cartItems = this.cartService.getCartItems();
  }

  formatPrice(price: number): string {
    return this.currencyPipe.transform(price, 'HUF', 'symbol', '1.0-0') || '';
  }
  navigateToShop() {
    this.router.navigate(['/shop']);
  }
}