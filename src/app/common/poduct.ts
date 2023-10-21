
export class Product {
   
    //matches the actual json data 
    constructor(
        public productId: number,//new line
        public sku: string,
        public product_name: string,
        public description: string,
        public unit_price: number,
        public image_url: string,
        public active: boolean,
        public units_in_stock: number,
        public date_created: Date,
        public last_updated: Date
        ){}
}
