import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: any[] = [];

  constructor(private shopService: ShopService, private router: Router) {} 

  ngOnInit() {
    this.products = this.shopService.getProducts();
  }

  addToCart(product: any) {
    this.shopService.addToCart(product);
    alert(`${product.name} telah ditambahkan ke keranjang!`);
    this.router.navigate(['/cart']);
  }
}
