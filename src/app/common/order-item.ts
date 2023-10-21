import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl: string="";
    unitPrice: number=0;
    quantity: number=0;
    productId: string="";

    constructor(cartItem: CartItem)
    {
        this.imageUrl=cartItem.image_url;
        this.quantity=cartItem.quantity;
        this.unitPrice=cartItem.unit_price;
        this.productId=cartItem.id;
    }
}
