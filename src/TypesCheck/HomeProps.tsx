
// export interface ProductListParams {
//     _id: string;
//     images: [string];
//     name: string;
//     price: number;
//     oldPrice?: number;
//     inStock?: boolean;
//     color?: string;
//     size?: string
// }


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
}
export interface FetchProductsParams {
    data: {
        Product: ProductListParams[]
        results: ProductListParams[]
    }
}