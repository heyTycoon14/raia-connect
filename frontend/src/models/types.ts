export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export interface CheckoutRequest {
  productId: string;
  quantity?: number;
}
