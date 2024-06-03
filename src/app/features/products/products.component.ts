import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/services/product.service';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from 'src/app/components/product-dialog/product-dialog.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

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

  constructor(
    private productsService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => (this.products = products),
    });
  }

  openProductDialog(product?: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: { product, isEdit: !!product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (product) {
          this.productsService
            .updateProduct(result, product._id!)
            .subscribe(() => this.loadProducts());
        } else {
          this.productsService
            .createProduct(result)
            .subscribe(() => this.loadProducts());
        }
      }
    });
  }

  openDeleteConfirmationDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productsService
          .deleteProduct(id)
          .subscribe(() => this.loadProducts());
      }
    });
  }

  createProduct(): void {
    this.openProductDialog();
  }

  editProduct(product: Product): void {
    this.openProductDialog(product);
  }

  deleteProduct(id: string): void {
    this.openDeleteConfirmationDialog(id);
  }
}
