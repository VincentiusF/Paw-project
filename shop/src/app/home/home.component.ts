import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userName: string = 'Dimas'; // Ganti dengan nama pengguna yang diambil dari sistem autentikasi

  logout(): void {
    // Tambahkan logika logout di sini
    console.log('User logged out');
    window.location.href = '/login'; // Arahkan ke halaman login
  }
}
