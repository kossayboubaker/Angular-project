import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../product.model';
import { ProductService } from '../services/product.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent {
  public users: any[] = [];
  public paginatedUsers: any[] = [];
  public fullName: string = '';
  public role: string = '';
  public searchTerm: string = ''; // For search functionality

  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
  };

  constructor(private productService: ProductService, private router: Router,private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService) {
    
  }
  ngOnInit() {
    this.api.getUsers().subscribe(res => {
      this.users = res;
      
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
        this.router.navigate(['/products-list']);
      },
      (error: any) => {
        console.error('Error creating product', error);
      }
    );
  }
  logout() {
    this.auth.signOut();
  }
}
