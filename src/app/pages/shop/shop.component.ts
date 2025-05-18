import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { ProductComponent } from './product/product.component';
import { Product } from '../../shared/models/product';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { ProductService } from '../../shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule, 
    ProductComponent,
    MatToolbarModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatBadgeModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SearchPipe
  ],
  providers: [CartService, ProductService, SearchPipe],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements AfterViewInit, DoCheck {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private cartService: CartService, private productService: ProductService, private router: Router) {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = [...products];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Hiba a termékek betöltésekor:', err);
        this.isLoading = false;
      }
    });
  }

  createNewProduct() {
    const newProduct: Omit<Product, 'id'> = {
      name: 'Új termék',
      price: 0,
      image: 'assets/default.jpg',
      description: '',
      featured: false,
      discount: 0,
      categories: []
    };
    
    this.productService.createProduct(newProduct).subscribe({
      next: (product) => {
        console.log('Termék létrehozva:', product);
        this.loadProducts(); // Frissítjük a listát
      },
      error: (err) => console.error('Hiba a termék létrehozásakor:', err)
    });
  }

  // Termék frissítése
  updateProduct(product: Product) {
    this.productService.updateProduct(product.id, product).subscribe({
      next: (updatedProduct) => {
        console.log('Termék frissítve:', updatedProduct);
        this.loadProducts(); // Frissítjük a listát
      },
      error: (err) => console.error('Hiba a termék frissítésekor:', err)
    });
  }

  // Termék törlése
  deleteProduct(id: number) {
    if (confirm('Biztosan törölni szeretnéd ezt a terméket?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (success) => {
          if (success) {
            console.log('Termék törölve');
            this.loadProducts(); // Frissítjük a listát
          }
        },
        error: (err) => console.error('Hiba a termék törlésekor:', err)
      });
    }
  }

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategoryIds: string[] = [];
  showOnlyFeatured = false;
  isLoading = false;
  searchTerm = '';
  previousSearchTerm = '';
  previousFilterState = '';
  
  // Lapozás
  pageSize = 4;
  pageSizeOptions = [4, 8, 12];
  cartItemCount = 0;

  ngAfterViewInit() {
    console.log('Shop komponens nézete betöltődött');
    // Automatikus fókusz a keresőmezőre
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
      console.log('Keresőmező fókuszba került');
    }, 0);
  }

  ngDoCheck() {
    // Ellenőrizzük a keresési feltétel változását
    if (this.searchTerm !== this.previousSearchTerm) {
      console.log('Keresési feltétel változott:', this.searchTerm);
      this.previousSearchTerm = this.searchTerm;
      this.applyFilters();
    }

    // Ellenőrizzük a szűrők változását
    const currentFilterState = JSON.stringify({
      categories: this.selectedCategoryIds,
      featured: this.showOnlyFeatured
    });

    if (currentFilterState !== this.previousFilterState) {
      console.log('Szűrők változtak:', currentFilterState);
      this.previousFilterState = currentFilterState;
      this.applyFilters();
    }
  }

  // Egyedi kategóriák kinyerése
  get uniqueCategories() {
    const categories = new Map<string, {id: string, name: string}>();
    this.products.forEach(product => {
      product.categories?.forEach(category => {
        categories.set(category.id, category);
      });
    });
    return Array.from(categories.values());
  }

  // Kategória szűrő váltása
  toggleCategoryFilter(categoryId: string) {
    const index = this.selectedCategoryIds.indexOf(categoryId);
    if (index >= 0) {
      this.selectedCategoryIds.splice(index, 1);
    } else {
      this.selectedCategoryIds.push(categoryId);
    }
  }

  // Szűrők alkalmazása
  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const categoryMatch = this.selectedCategoryIds.length === 0 || 
        product.categories?.some(cat => this.selectedCategoryIds.includes(cat.id));
      const featuredMatch = !this.showOnlyFeatured || product.featured;
      return categoryMatch && featuredMatch;
    });

    console.log('Szűrt termékek száma:', this.filteredProducts.length);
  }

  // Rendezési függvények
  sortByPrice(direction: 'asc' | 'desc') {
    this.filteredProducts.sort((a, b) => 
      direction === 'asc' ? a.price - b.price : b.price - a.price);
    console.log('Termékek rendezve ár szerint:', direction);
  }

  sortByName() {
    this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    console.log('Termékek rendezve név szerint');
  }

  // Lapozás kezelése
  onPageChange(event: any) {
    console.log('Lapozás:', event);
    // Implementálható lapozási logika
  }

  // Kosárba helyezés
  addToCart(product: Product) {
  console.log('Termék hozzáadva a kosárhoz:', product.name);
  this.cartService.addToCart(product);
  this.cartItemCount = this.cartService.getCartItems().length;
}
  navigateToCart() {
  this.router.navigate(['/cart']);
}
}