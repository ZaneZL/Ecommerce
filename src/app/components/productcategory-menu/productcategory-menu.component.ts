import { Component, OnInit } from '@angular/core';
import { productCategory } from 'src/app/common/productcategory';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productcategory-menu',
  templateUrl: './productcategory-menu.component.html',
  styleUrls: ['./productcategory-menu.component.css']
})
export class ProductcategoryMenuComponent implements OnInit {

  productCategories: productCategory[]=[];
  constructor(private productservice: ProductService) { }

  ngOnInit(): void {
    this.listProductcategories();
  }
  listProductcategories(){
    
    this.productservice.getProductCategories().subscribe(
      mappedData=>{
        //console.log('Product Categories=' + JSON.stringify(mappedData));
        this.productCategories = mappedData;
      }
    );
  }
}
