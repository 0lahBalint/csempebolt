import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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

  constructor() { }

  // Összes termék lekérése
  getProducts(): Observable<Product[]> {
    return of([...this.products]).pipe(delay(500));
  }

  // Termék lekérése ID alapján
  getProductById(id: number): Observable<Product> {
    const product = this.products.find(p => p.id === id);
    if (product) {
      return of({...product}).pipe(delay(500));
    }
    return throwError(() => new Error('Product not found')).pipe(delay(500));
  }

  // Új termék létrehozása
  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const newId = this.products.length > 0 
      ? Math.max(...this.products.map(p => p.id)) + 1 
      : 1;
    const newProduct = { ...product, id: newId };
    this.products.push(newProduct);
    return of(newProduct).pipe(delay(500));
  }

  // Termék frissítése
  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...product };
      return of({...this.products[index]}).pipe(delay(500));
    }
    return throwError(() => new Error('Product not found')).pipe(delay(500));
  }

  // Termék törlése
  deleteProduct(id: number): Observable<boolean> {
    const initialLength = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    return of(this.products.length < initialLength).pipe(delay(500));
  }
}