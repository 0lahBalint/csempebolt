import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../shared/models/product';
import { CartItem } from '../../shared/models/cartitem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: BehaviorSubject<CartItem[]>;
  cartItems$: ReturnType<BehaviorSubject<CartItem[]>['asObservable']>;

  constructor() {
    const initialCartItems = this.loadInitialCartItems();
    this.cartItems = new BehaviorSubject<CartItem[]>(initialCartItems);
    this.cartItems$ = this.cartItems.asObservable();
  }

  private loadInitialCartItems(): CartItem[] {
    return [];
  }

  addToCart(product: Product) {
    if (!product.id) {
      console.error('[CartService] HIBA: A terméknek nincs id mezője!', product);
      return;
    }

    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      console.log('[CartService] Meglévő termék mennyisége növelve:', existingItem);
    } else {
      const newItem: CartItem = { ...product, quantity: 1 };
      currentItems.push(newItem);
      console.log('[CartService] Új termék hozzáadva:', newItem);
    }

    this.cartItems.next([...currentItems]);
    console.log('[CartService] Frissített kosár tartalom:', this.cartItems.value);
  }

  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }

  removeFromCart(productId: string) {
    const currentItems = this.cartItems.value.filter(item => item.id === productId);
    this.cartItems.next([...currentItems]);
  }

  updateQuantity(productId: string, quantity: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(i => i.id === productId);

    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
    }
  }

  getTotal() {
    return this.cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.cartItems.next([]);
  }
}