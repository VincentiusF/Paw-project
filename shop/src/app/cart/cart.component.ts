import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any[] = [];

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.cart = this.shopService.getCart();
  }

  removeItem(productId: number) {
    this.shopService.removeFromCart(productId);
    this.cart = this.shopService.getCart(); // Perbarui tampilan setelah menghapus
  }

  clearCart() {
    console.log('Memanggil clearCart di ShopService...');
    this.shopService.clearCart();
    console.log('Keranjang telah dikosongkan.');
    this.cart = [];
    alert('Keranjang berhasil dikosongkan!');
  }
}
