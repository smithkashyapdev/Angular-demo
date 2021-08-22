import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/productCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }


  getCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );

  }


  getProducts(): Observable<Product[]> {

    // need to build URL based on product id
    const productsUrl = this.baseUrl;

    return this.httpClient.get<GetResponseProducts>(productsUrl).pipe(
       map(response => response._embedded.products)
    );
  }

  getProductListPaginate(thePage: number, 
                         thePageSize: number, 
                         theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
   }

   getSearchProductsPaginate(pageNumber: number, pageSize: number, searchKeyword: string): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${searchKeyword}`
     + `&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

}


interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}


interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

