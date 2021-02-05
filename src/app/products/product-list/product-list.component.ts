import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title = 'Products';
 // products: Product[];
//  productsNumber: number;
  products$: Observable<Product[]>;
  productsNumber$: Observable<number>;
  selectedProduct: Product;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl('/products/' + product.id);
  }

  constructor(
    private productService: ProductService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.products$ = this.productService.products$;

    this.productsNumber$ = this.products$
                                .pipe(
                                  map(products => products.length),
                                  startWith(0)
                                )

    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     results => {
    //        this.products = results;
    //        this.productsNumber = this.products.length;
    //     }
    //   )
  }

}
