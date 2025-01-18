import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = []; // Menyimpan produk di keranjang

  constructor() {
    // Memuat keranjang dari localStorage jika ada
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart); // Mengambil data keranjang yang tersimpan
    }
  }

  // Menambahkan produk ke keranjang
  addToCart(product: any) {
    // Cek apakah produk sudah ada di keranjang
    const existingProduct = this.cart.find(item => item.id === product.id);

    if (existingProduct) {
      // Jika sudah ada, tambah kuantitas
      existingProduct.quantity += 1;
    } else {
      // Jika belum ada, tambahkan produk baru ke keranjang dengan kuantitas 1
      this.cart.push({ ...product, quantity: 1 });
    }

    // Simpan perubahan keranjang ke localStorage
    this.saveCart();
  }

  // Mengambil data keranjang
  getCartItems() {
    return this.cart;
  }

  // Menghapus produk dari keranjang
  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.id !== productId);  // Menghapus produk berdasarkan ID
    this.saveCart();  // Simpan perubahan ke localStorage
  }

  // Mengosongkan keranjang
  clearCart() {
    this.cart = [];  // Kosongkan array keranjang
    this.saveCart();  // Simpan perubahan ke localStorage
  }

  // Menyimpan keranjang ke localStorage
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));  // Simpan data keranjang ke localStorage
  }
}
