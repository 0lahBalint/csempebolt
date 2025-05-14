import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MenuComponent } from './shared/menu/menu.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, ShopComponent, CartComponent, ProfileComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'csempebolt';

  page = 'home';

  changePage(selectedPage: string){
    this.page = selectedPage;
  }
}
