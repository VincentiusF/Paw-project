import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string = 'Dimas'; // Ganti dengan nama pengguna dari sistem autentikasi
  welcomeMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Panggil fungsi untuk memuat data awal halaman
    this.loadHomePage();
  }

  loadHomePage() {
    // Inisialisasi pesan selamat datang
    this.welcomeMessage = `Selamat datang kembali, ${this.userName}!`;
    console.log('Halaman Home berhasil dimuat.');
  }

  navigateToShop() {
    // Navigasi ke halaman Shop
    this.router.navigate(['/shop']);
  }

  navigateToCart() {
    // Navigasi ke halaman Cart
    this.router.navigate(['/cart']);
  }
}
