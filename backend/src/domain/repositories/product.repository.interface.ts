import { Product } from '../entities/product.entity';

export interface IProductRepository {
  findAll(category?: string): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  save(product: Product): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  decrementStock(id: string, quantity: number): Promise<void>;
}
