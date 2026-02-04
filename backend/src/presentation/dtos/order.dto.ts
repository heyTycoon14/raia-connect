export class OrderDto {
  id: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status: string;
  createdAt: Date;
}
