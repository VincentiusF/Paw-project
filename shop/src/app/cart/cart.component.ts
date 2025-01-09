import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Subscription } from 'rxjs';  // Impor Subscription dari RxJS

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart: any[] = [];
  private cartSubscription!: Subscription;  // Deklarasi Subscription

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    // Melakukan subscription untuk mendapatkan data keranjang
    this.cartSubscription = this.shopService.getCart().subscribe((cart) => {
      this.cart = cart;  // Menyimpan data keranjang ke dalam array
    });
  }

  removeItem(productId: number) {
    this.shopService.removeFromCart(productId);
    // Memperbarui tampilan setelah menghapus item dari cart
    this.shopService.getCart().subscribe((updatedCart) => {
      this.cart = updatedCart;
    });
  }

  clearCart() {
    console.log('Memanggil clearCart di ShopService...');
    this.shopService.clearCart();
    console.log('Keranjang telah dikosongkan.');
    this.cart = [];  // Kosongkan data keranjang dari tampilan
    alert('Keranjang berhasil dikosongkan!');
  }

  ngOnDestroy() {
    // Pastikan untuk unsubscribe agar tidak ada memory leak
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
