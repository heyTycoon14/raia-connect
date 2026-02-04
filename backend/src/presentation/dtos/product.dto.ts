export class ProductDto {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
