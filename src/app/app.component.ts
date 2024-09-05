import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './components/product.model';
import { ProductService } from './components/services/product.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  'title': string;


  constructor(private productService: ProductService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



}
