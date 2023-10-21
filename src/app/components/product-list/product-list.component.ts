import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/poduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[]=[];
  currentCategoryId:number=1;
  previousCategoryId: number=1;
  searchMode: boolean=false;

  //properties for pagination
  thePageNumber: number=1;
  thePageSize: number=5;
  theTotalElements: number=0;
  
  previouskeyword: string="";

  constructor(private productService: ProductService, 
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(){
    
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
  }

  listProducts(){
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode)
    {
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const theKeyword: string=this.route.snapshot.paramMap.get('keyword')!;

    //if we have a different keword than previous then set the pagenumber to 1
    if(this.previouskeyword != theKeyword)
    {
      this.thePageNumber=1;
    }
    this.previouskeyword=theKeyword;

    this.productService.searchProductsPagination(this.thePageNumber-1,this.thePageSize, theKeyword)
    .subscribe(this.proccessResult());
  }
  proccessResult() {
    return(data:any)=>
    {
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    };
  }
  handleListProducts(){
     //check if id is available
     const hasCategoryId: boolean=this.route.snapshot.paramMap.has('id');
     if(hasCategoryId)
     {
       //get the id param string convert string to a number using the + symbol
       this.currentCategoryId=+this.route.snapshot.paramMap.get('id')!;
     }
     else{
       //not category id a
       this.currentCategoryId=1;
     }
     //check if different category from previous
     //angular will reuse a component if it is currently being viewed
     //if we have a different category id than previous then set the pagenumber back to 1
     if(this.previousCategoryId != this.currentCategoryId)
     {
      this.thePageNumber=1;
     }

     this.previousCategoryId=this.currentCategoryId;
     console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
     this.productService.getProductListPagination(this.thePageNumber-1,
                                                  this.thePageSize, 
                                                  this.currentCategoryId)
                                                  .subscribe(this.proccessResult())//(
                                                  //   data=>{
                                                  //     this.products=data._embedded.products;
                                                  //     this.thePageNumber=data.page.number+1;
                                                  //     this.thePageSize=data.page.size;
                                                  //     this.theTotalElements=data.page.totalElements;
                                                  //   }
                                                  // );//angular pagination is 1 based and spring rest is 0 based
    //  this.productService.getProductList(this.currentCategoryId).subscribe(
    //    data=>{
    //      this.products=data;
    //          }
    //  );
  }
  addToCart(theProduct: Product)
  {
    console.log(`adding to cart: ${theProduct.product_name}, ${theProduct.unit_price}`);
    const thecartItem= new CartItem(theProduct);
    this.cartService.addToCart(thecartItem);

  }
}
