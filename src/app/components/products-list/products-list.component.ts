import { Component, OnInit } from '@angular/core';

import { Product } from '../product.model';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductListComponent implements OnInit {
   public users: any[] = [];
  public paginatedProducts: any[] = [];
  public fullName: string = '';
  public role: string = '';
  public searchTerm: string = '';
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
  };
  products: Product[] = [];
  selectedProduct: Product | undefined;

  selectedProductById: Product | undefined; // Variable pour afficher les détails du produit
  isUpdateMode: boolean = false;


  constructor(private productService: ProductService, private router: Router,private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService) {}
    ngOnInit() {
      this.api.getUsers().subscribe(res => {
        this.users = res;
        this.loadProducts();

      });

      this.userStore.getFullNameFromStore().subscribe(val => {
        const fullNameFromToken = this.auth.getfullNameFromToken();
        this.fullName = val || fullNameFromToken;
      });

      this.userStore.getRoleFromStore().subscribe(val => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      });
    }



  createProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe(
      () => {
        console.log('Product created successfully');
        this.loadProducts();
        this.router.navigate(['']);
        this.resetNewProduct();
      },
      (error: any) => {
        console.error('Error creating product', error);
      }
    );
  }

  loadProducts(): void {
    this.productService.getProduct().subscribe({
      next: (response: any) => {
        this.products = response.resultat.items;
      },
      error: (error: any) => {
        console.error('Error while loading products', error);
      },
    });
  }

  selectProduct(product: Product): void {
    this.selectedProduct = { ...product };
     //this.isUpdateMode = true; // Set to update mode
    // this.selectedProductById = null; // Clear the view mode product
  }

  selectProductById(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.selectedProductById = { ...product };
         // Set to view mode
         // Clear the update mode product
      },
      error: (error: any) => {
        console.error('Error finding product', error);
      },
    });
  }

  onSubmit(): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct).subscribe({
        next: () => {
          console.log('Product updated successfully');
          this.loadProducts();
          this.selectedProduct = undefined;
          //this.isUpdateMode = false;
        },
        error: (error: any) => {
          console.error('Error updating product:', error);
        },
      });
    }
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.loadProducts();
      },
      error: (error: any) => {
        console.error('Error deleting product:', error);
      },
    });
  }


  private resetNewProduct(): void {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0,
    };
  }
  logout() {
    this.auth.signOut();
  }




}
