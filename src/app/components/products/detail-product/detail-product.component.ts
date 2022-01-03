import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  product: Product = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productService.getProductById(id).subscribe(
      data => {
        this.product = data;
      },
      err => {
        this.toastr.error(err.error.message, 'Fail!',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }
    )
  }

  back(): void{
    this.router.navigate(['/list']);
  }


}
