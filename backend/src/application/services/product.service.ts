import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { Product } from '@domain/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async findAll(category?: string): Promise<Product[]> {
    return this.productRepository.findAll(category);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async checkStock(productId: string, quantity: number): Promise<boolean> {
    const product = await this.findById(productId);
    return product.hasStock(quantity);
  }
}
