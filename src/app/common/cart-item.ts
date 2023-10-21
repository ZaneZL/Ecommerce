import { Product } from "./poduct"

export class CartItem {
    id: string="";
    product_name: string="";
    unit_price: number=0;
    image_url: string="";
    quantity: number=0;
    constructor(product: Product)
    {
        this.id=product.productId.toString();//
        this.product_name=product.product_name;
        this.image_url=product.image_url;
        this.unit_price=product.unit_price;
        this.quantity=1;
    }
    
        
}
