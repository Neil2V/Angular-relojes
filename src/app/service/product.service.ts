import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl = 'http://localhost:8081/product/';

  constructor(
    private httpCliente : HttpClient
  ) { }

  public listProducts(): Observable<Product[]>{
    return this.httpCliente.get<Product[]>(this.productUrl+'list');
  }

  public getProductById(id: number): Observable<Product>{
    return this.httpCliente.get<Product>(this.productUrl+`details/${id}`);  
  }

  public createProduct(product: Product): Observable<any>{
    return this.httpCliente.post<any>(this.productUrl+'create',product);
  }

  public updateProduct(id: number, product: Product): Observable<any>{
    return this.httpCliente.put<any>(this.productUrl+`update/${id}`, product);
  }

  public deleteProduct(id: number): Observable<any>{
    return this.httpCliente.delete<any>(this.productUrl+`delete/${id}`);
  }

}
