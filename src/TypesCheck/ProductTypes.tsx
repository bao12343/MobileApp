export interface IProductProps {
    item: {
        _id: string;
        images: string[];
        name: string;
        quantity?: number;
        price:number;
    };
    productProps: {
        imageBg: string;
        percentageWidth?: number;
        onPress?: () => void;
        width?: number;
        marginHorizontal?: number;
        marginBottom?: number;
        height?: number;
        resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
    };
    pStyleProps: {
        
        // imageBgHt ?: number;
        width?: number;
        height?: number;
        marginHorizontal?: number;
        marginBottom?: number;
        resizeMode?: "contain" | "cover" | "stretch";
        radius?: number;
    };
}


export interface Order {
    _id: string;
    user: User;
    Products: Array<{
      name: string;
      quantity: number;
      price: number;
      images: string[];
    }>;
    totalPrice: number;
    shippingAddress: {
      firstName: string;
      lastName: string;
      email: string;
      mobileNo: string;
      deliveryInfo: string;
      region: string;
      city: string;
    };
    paymentMethod: string;
    createdAt: string;
  }
  export interface User {
    _id: string;
}