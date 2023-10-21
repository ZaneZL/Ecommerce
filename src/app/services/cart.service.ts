import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[]=[];
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0.00);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(thecartItem: CartItem)
  {
    //check if we alrdy have the item
    let alreadExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;//!
    //find the item in the cart based on item id
    if(this.cartItems.length>0)
    {
      existingCartItem=this.cartItems.find(temp => temp.id ===thecartItem.id)!;
    //   if (foundItem) {
    //     existingCartItem = foundItem;
    // } else {
    //     // Handle the case when no item is found
    // }
      // for(let tempCartItem of this.cartItems)
      // {
      //   if(tempCartItem.id===thecartItem.id)
      //   {
      //     existingCartItem=tempCartItem;
      //     break;
      //   }
      // }
      alreadExistInCart=(existingCartItem != undefined);
    }
    if(alreadExistInCart)
    {
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(thecartItem);
    }
    this.computeCartTotal();
  }
  computeCartTotal() {
   let totalPriceValue: number=0;
   let totalQuantityValue: number=0;
   for(let currentCartItem of this.cartItems)
   {
    totalPriceValue+=currentCartItem.quantity*currentCartItem.unit_price;
    totalQuantityValue+=currentCartItem.quantity;
   }
   this.totalPrice.next(totalPriceValue);
   this.totalQuantity.next(totalQuantityValue);
   //
   this.logCartData(totalPriceValue,totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('contents of the cart');
    for(let temp of this.cartItems)
    {
      const subtotal=temp.quantity*temp.unit_price;
      console.log(`name: ${temp.product_name}, 
      quantity=${temp.quantity}, unitPrice= ${temp.unit_price}, subtotal= ${subtotal}`);
    }
    console.log(`totalprice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('-------------');
  }
}
