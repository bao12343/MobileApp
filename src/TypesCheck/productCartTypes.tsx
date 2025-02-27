export interface ProductListParams {
    _id: string;
    images: [string];
    name: string;
    price: number;
    oldPrice?: number;
    inStock?: boolean;
    size?: string;
    description?: string;
    quantity: number;
    // isFeatured?: boolean;
    // category: string;
    // color:string;
}
export interface CartItem{
    cart : ProductListParams[]
}
export interface CartState{
    cart: {
        cart: ProductListParams[],
        length: number
    }
}