import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ProductComponent } from './product/product.component';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, ProductComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  constructor(private cartService: CartService) {}
  products: Product[] = [
    {
      id: 1,
      name: 'Klasszikus fehér csempe',
      price: 4500,
      image: 'assets/tile1.jpg',
      description: '60x60 cm, matt felületű fehér csempe',
      featured: true,
      discount: 0,
      categories: [
        { id: '1', name: 'Padlócsempe' }
      ]
    },
    {
      id: 2,
      name: 'Modern szürke mozaik',
      price: 6800,
      image: 'assets/tile2.jpg',
      description: '30x30 cm, geometrikus mintázatú',
      featured: false,
      discount: 0.2,
      categories: [
        { id: '2', name: 'Mozaik' }
      ]
    },
    {
      id: 3,
      name: 'Falburkoló kékes csempe',
      price: 5200,
      image: 'assets/tile3.jpg',
      description: '25x40 cm, kékes árnyalatú',
      featured: false,
      discount: 0,
      categories: [
        { id: '3', name: 'Falcsempe' }
      ]
    },
    {
      id: 4,
      name: 'Padlóra való barnás csempe',
      price: 5900,
      image: 'assets/tile4.jpg',
      description: '45x45 cm, antik hatású',
      featured: false,
      discount: 0,
      categories: [
        { id: '4', name: 'Padlócsempe' }
      ]
    }
  ];

  addToCart(product: Product) {
    console.log('Termék hozzáadva:', product);
    this.cartService.addToCart(product);
  }
}
