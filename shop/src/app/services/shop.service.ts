import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  clearCart() {
    this.cart.next([]);
    this.saveCart([]); // Kosongkan keranjang di localStorage
  }
  private products = [
    {
      id: 1,
      name: 'Cetak Foto',
      description: 'Cetakan foto berkualitas tinggi.',
      price: 5000,
      image: 'assets/images/foto.jpeg'
    },
    {
      id: 2,
      name: 'Cetak Poster',
      description: 'Poster dengan ukuran besar.',
      price: 15000,
      image: 'assets/images/poster.jpeg'
    },
    {
      id: 3,
      name: 'Cetak Brosur',
      description: 'Brosur profesional untuk bisnis.',
      price: 10000,
      image: 'assets/images/brosur.jpeg'
    },
    {
      id: 4,
      name: 'Cetak Spanduk',
      description: 'Spanduk berkualitas untuk promosi Anda.',
      price: 25000,
      image: 'assets/images/spanduk.jpeg'
    },
    {
      id: 5,
      name: 'Cetak Kartu Nama',
      description: 'Kartu nama elegan dan profesional.',
      price: 7000,
      image: 'assets/images/kartunama.jpeg'
    },
    {
      id: 6,
      name: 'Cetak Kalender',
      description: 'Kalender personal atau bisnis.',
      price: 20000,
      image: 'assets/images/kalender.jpeg'
    },
    {
      id: 7,
      name: 'Cetak Stiker',
      description: 'Stiker custom berbagai ukuran.',
      price: 5000,
      image: 'assets/images/stiker.jpeg'
    },
    {
      id: 8,
      name: 'Cetak Buku',
      description: 'Buku untuk keperluan pribadi atau bisnis.',
      price: 50000,
      image: 'assets/images/buku.jpeg'
    },
    {
      id: 9,
      name: 'Cetak Amplop',
      description: 'Amplop dengan desain khusus.',
      price: 12000,
      image: 'assets/images/amplop.jpeg'
    },
    {
      id: 10,
      name: 'Cetak Katalog',
      description: 'Katalog untuk produk atau layanan Anda.',
      price: 30000,
      image: 'assets/images/katalog.jpeg'
    }
  ];

  private cartKey = 'cart';  // Nama key untuk menyimpan keranjang di localStorage

  private cart = new BehaviorSubject<any[]>(this.loadCart());

  // Memuat cart dari localStorage
  private loadCart(): any[] {
    const cartData = localStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : [];
  }

  getProducts() {
    return this.products;
  }

  getCart() {
    return this.cart.asObservable();
  }

  addToCart(product: any) {
    const currentCart = this.cart.getValue();
    const existingProduct = currentCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cart.next(currentCart);
    this.saveCart(currentCart); // Simpan keranjang ke localStorage
  }

  removeFromCart(productId: number) {
    const currentCart = this.cart.getValue().filter((item) => item.id !== productId);
    this.cart.next(currentCart);
    this.saveCart(currentCart); // Simpan keranjang ke localStorage
  }

  private saveCart(cart: any[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }
}
