import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/services/product.service';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  products: Product[] = [];
  displayedColumns: string[] = ['title', 'author', 'genre', 'price', 'actions'];

  constructor(private productsService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.productsService.refreshProducts$.subscribe(() => this.loadProducts());
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => (this.products = products),
    });
  }
}
