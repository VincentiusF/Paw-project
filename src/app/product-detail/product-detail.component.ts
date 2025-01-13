// File: src/app/product-detail/product-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.shopService.getProductById(id);

    if (!this.product) {
      alert('Produk tidak ditemukan!');
      this.router.navigate(['/shop']);
    }
  }

  addToCart() {
    this.shopService.addToCart(this.product);
    alert(`${this.product.name} telah ditambahkan ke keranjang!`);
    this.router.navigate(['/cart']);
  }

   goBackToShop(): void {
    this.router.navigate(['/shop']);
  }
}