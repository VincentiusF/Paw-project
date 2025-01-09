import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  clearCart() {
    this.cart = []; // Kosongkan array keranjang
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

  private cartKey = 'cart'; 

  private cart: any[] = [];

  getProducts() {
    return this.products;
  }

  addToCart(product: any) {
    const existingProduct = this.cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Jika produk sudah ada, tambahkan quantity
      existingProduct.quantity += 1;
    } else {
      // Jika produk belum ada, tambahkan ke array dengan quantity = 1
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  getCart() {
    return this.cart;
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.id !== productId);
  }

  
}
