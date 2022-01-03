import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { IndexComponent } from './components/index/index.component';
import { DetailProductComponent } from './components/products/detail-product/detail-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { NewProductComponent } from './components/products/new-product/new-product.component';
import { ProGuardService as guard} from './guards/pro-guard.service';


const routes: Routes = [
  {path: '', component: IndexComponent, },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'list', component: ListProductsComponent, canActivate: [guard], data: {receveidRol: ['admin', 'user']}},
  {path: 'new', component: NewProductComponent, canActivate: [guard], data: {receveidRol: ['admin']}},
  {path: 'detail/:id', component: DetailProductComponent, canActivate: [guard], data: {receveidRol: ['admin', 'user']}},
  {path: 'edit/:id', component: EditProductComponent, canActivate: [guard], data: {receveidRol: ['admin']}},
  {path: '**', redirectTo: '' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
