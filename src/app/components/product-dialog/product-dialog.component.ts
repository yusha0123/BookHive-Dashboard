import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
})
export class ProductDialogComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { product: Product; isEdit: boolean }
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: [this.data?.product?.title || '', Validators.required],
      author: [this.data?.product?.author || '', Validators.required],
      genre: [this.data?.product?.genre || '', Validators.required],
      price: [this.data?.product?.price || 0, Validators.required],
      coverUrl: [this.data?.product?.coverUrl || '', Validators.required],
      description: [this.data?.product?.description || '', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.productForm.value);
  }
}
