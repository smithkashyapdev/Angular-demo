import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule} from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCategorySideMenuComponent } from './components/product-category-side-menu/product-category-side-menu.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SearchComponent } from './components/search/search.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartProductsComponent } from './components/cart-products/cart-products.component';

const routes: Routes = [
  {path: 'category', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'cartProducts', component: CartProductsComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: '**', redirectTo: '/products', pathMatch: 'full'},
  {path: '', redirectTo: '/products', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    ProductCategorySideMenuComponent,
    ProductListComponent,
    ProductDetailComponent,
    SearchComponent,
    CartStatusComponent,
    CartProductsComponent
    ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
