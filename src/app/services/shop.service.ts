import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private products = [
    {
      id: 1,
      name: 'Cetak Foto',
      description: 'Cetakan foto berkualitas tinggi.',
      price: 5000,
      image: 'assets/images/foto.jpeg',
    },
    {
      id: 2,
      name: 'Cetak Poster',
      description: 'Poster dengan ukuran besar.',
      price: 15000,
      image: 'assets/images/poster.jpeg',
    },
    {
      id: 3,
      name: 'Cetak Brosur',
      description: 'Brosur profesional untuk bisnis.',
      price: 10000,
      image: 'assets/images/brosur.jpeg',
    },
    {
      id: 4,
      name: 'Cetak Spanduk',
      description: 'Spanduk berkualitas untuk promosi Anda.',
      price: 25000,
      image: 'assets/images/spanduk.jpeg',
    },
    {
      id: 5,
      name: 'Cetak Kartu Nama',
      description: 'Kartu nama elegan dan profesional.',
      price: 7000,
      image: 'assets/images/kartunama.jpeg',
    },
    {
      id: 6,
      name: 'Cetak Kalender',
      description: 'Kalender personal atau bisnis.',
      price: 20000,
      image: 'assets/images/kalender.jpeg',
    },
    {
      id: 7,
      name: 'Cetak Stiker',
      description: 'Stiker custom berbagai ukuran.',
      price: 5000,
      image: 'assets/images/stiker.jpeg',
    },
    {
      id: 8,
      name: 'Cetak Buku',
      description: 'Buku untuk keperluan pribadi atau bisnis.',
      price: 50000,
      image: 'assets/images/buku.jpeg',
    },
    {
      id: 9,
      name: 'Cetak Amplop',
      description: 'Amplop dengan desain khusus.',
      price: 12000,
      image: 'assets/images/amplop.jpeg',
    },
    {
      id: 10,
      name: 'Cetak Katalog',
      description: 'Katalog untuk produk atau layanan Anda.',
      price: 30000,
      image: 'assets/images/katalog.jpeg',
    },
  ];

  private cartKey = 'cart'; // Nama key untuk menyimpan keranjang di localStorage
  private cart = new BehaviorSubject<any[]>(this.loadCart()); // Keranjang disimpan dalam BehaviorSubject

  constructor() {}

  // Mendapatkan produk berdasarkan ID
  getProductById(id: number): any | undefined {
    return this.products.find((product) => product.id === id); // Mengambil produk berdasarkan ID
  }

  // Mendapatkan semua produk
  getProducts() {
    return this.products; // Mengembalikan daftar produk
  }

  // Mendapatkan data keranjang (cart)
  getCart() {
    return this.cart.asObservable(); // Menggunakan asObservable agar hanya bisa di-subscribe
  }

  // Menambahkan produk ke dalam keranjang
  addToCart(product: any) {
    const currentCart = this.cart.getValue(); // Ambil produk yang ada di keranjang saat ini
    const existingProduct = currentCart.find((item) => item.id === product.id); // Cek apakah produk sudah ada

    if (existingProduct) {
      existingProduct.quantity += 1; // Jika produk sudah ada, tambah kuantitasnya
    } else {
      currentCart.push({ ...product, quantity: 1 }); // Jika produk belum ada, tambahkan produk ke keranjang dengan kuantitas 1
    }

    this.updateCart(currentCart); // Update keranjang dan simpan ke localStorage
  }

  // Menghapus produk dari keranjang berdasarkan ID
  removeFromCart(productId: number) {
    const currentCart = this.cart.getValue().filter((item) => item.id !== productId); // Hapus produk berdasarkan ID
    this.updateCart(currentCart); // Update keranjang dan simpan ke localStorage
  }

  // Mengosongkan keranjang
  clearCart() {
    this.updateCart([]); // Kosongkan keranjang dan simpan perubahan ke localStorage
  }

  // Update keranjang dan simpan ke localStorage
  private updateCart(cart: any[]) {
    this.cart.next(cart); // Update BehaviorSubject dengan keranjang yang baru
    this.saveCart(cart); // Simpan perubahan keranjang ke localStorage
  }

  // Menyimpan data keranjang ke localStorage
  private saveCart(cart: any[]) {
    try {
      localStorage.setItem(this.cartKey, JSON.stringify(cart)); // Menyimpan keranjang dalam bentuk string di localStorage
    } catch (e) {
      console.error('Gagal menyimpan keranjang ke localStorage:', e); // Menangani kesalahan saat menyimpan ke localStorage
    }
  }

  // Memuat data keranjang dari localStorage
  private loadCart(): any[] {
    try {
      const cartData = localStorage.getItem(this.cartKey); // Ambil data dari localStorage
      return cartData ? JSON.parse(cartData) : []; // Parse data JSON atau kembalikan array kosong jika tidak ada
    } catch (e) {
      console.error('Gagal memuat keranjang dari localStorage:', e); // Menangani kesalahan saat memuat dari localStorage
      return []; // Kembalikan array kosong jika terjadi kesalahan
    }
  }
}
