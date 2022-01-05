import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  name = '';
  price: number = null;

  constructor(
    private productService : ProductService,
    private router: Router,
    private toastr: ToastrService 
  ) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    const product = new Product(this.name, this.price);
    this.productService.createProduct(product).subscribe(
        data => {
          this.toastr.success('Brand registered', 'Ok!',{
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['/list']);
        },
        err => {
          this.toastr.error(err.error.message, 'Fail!',{
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['/']);
        }
    );
  }

  back(): void{
    this.router.navigate(['/list']);
  }

}
