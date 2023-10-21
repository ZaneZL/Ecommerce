import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/poduct';
import { map } from 'rxjs/operators';
import { productCategory } from '../common/productcategory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl='http://localhost:8080/api/productcategorys';

  constructor(private httpClient: HttpClient) { }

  getProductListPagination(thePage: number,
                           thePageSize: number,
                           theCategoryId: number): Observable<GetResponse> {

    //need to build url on category id , page and size
    const searchUrl=`${this.baseUrl}/search/findBycategoryId?id=${theCategoryId}`
                    +`&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }
  getProductList(theCategoryId: number): Observable<Product[]> {

    //need to build url
    const searchUrl=`${this.baseUrl}/search/findBycategoryId?id=${theCategoryId}`
    return this.getProducts(searchUrl);
  }
  searchProducts(theKeyword: string): Observable<Product[]>{
    //need to build url on the keyword
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }
  
  searchProductsPagination(thePage: number,
                            thePageSize: number,
                            theKeyword: string): Observable<GetResponse> {

  //need to build url on keyword , page and size
  const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
  +`&page=${thePage}&size=${thePageSize}`;
  return this.httpClient.get<GetResponse>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]>{
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  
  getProductCategories(): Observable<productCategory[]>
  {
    //this worked
    // this.httpClient.get<GetResponseProductscategory>(this.categoryUrl).subscribe(
    //   response => {
    //     console.log('Full Response:', response);
    //   }
    // );
    //this worked too
    // this.httpClient.get<GetResponseProductscategory>(this.categoryUrl).subscribe(
    //   data=>{
    //     console.log('Product Categories=' + JSON.stringify(data));
    //     //this.productCategories = data;
    //   }
    // );
    //so problem is piping and mapping

    return this.httpClient.get<GetResponseProductscategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategories)
    );
    
  }
 
}

interface GetResponse {
  _embedded: {
    products: Product[];
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
//!!!!!!!!name this thing as in the json structure from the api
interface GetResponseProductscategory {
  _embedded: {
    productCategories : productCategory [];
  }
}