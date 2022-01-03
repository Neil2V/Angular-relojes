import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product = null;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productService.getProductById(id).subscribe(
      (data: Product) => {
        this.product = data;
      }
    )
  }

  editProduct(): void{
    const id = this.activatedRoute.snapshot.params.id;
    this.productService.updateProduct(id, this.product).subscribe(
      data => {
        this.toastr.success('Updated product', 'Ok!',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail!',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      }
    )
  }

  back(): void{
    this.router.navigate(['/list']);
  }

}
