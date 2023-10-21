import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  cartItems: CartItem[]=[];
  totalPrice: number=0;
  totalQuantity: number=0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    //get a handle to the cart items
    this.cartItems=this.cartService.cartItems;
    //subscribe to totalprice
    this.cartService.totalPrice.subscribe(
      data=> this.totalPrice=data
    );
    //totalquantity
    this.cartService.totalQuantity.subscribe(
      data=> this.totalQuantity=data
    );
    //compute total
    this.cartService.computeCartTotal();
  }

}
