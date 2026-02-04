import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { Product } from '@domain/entities/product.entity';
import { ProductEntity } from '../database/entities/product.entity';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(category?: string): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    
    if (category) {
      queryBuilder.where('product.category = :category', { category });
    }

    const entities = await queryBuilder.getMany();
    return entities.map(entity => this.toDomain(entity));
  }

  async findById(id: string): Promise<Product | null> {
    const entity = await this.productRepository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async save(product: Product): Promise<Product> {
    const entity = this.toEntity(product);
    const saved = await this.productRepository.save(entity);
    return this.toDomain(saved);
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, product as any);
    const updated = await this.productRepository.findOne({ where: { id } });
    return this.toDomain(updated);
  }

  async decrementStock(id: string, quantity: number): Promise<void> {
    await this.productRepository
      .createQueryBuilder()
      .update(ProductEntity)
      .set({ stock: () => `stock - ${quantity}` })
      .where('id = :id', { id })
      .andWhere('stock >= :quantity', { quantity })
      .execute();
  }

  private toDomain(entity: ProductEntity): Product {
    return new Product({
      id: entity.id,
      name: entity.name,
      price: Number(entity.price),
      category: entity.category,
      stock: entity.stock,
      description: entity.description,
      imageUrl: entity.imageUrl,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  private toEntity(domain: Product): ProductEntity {
    const entity = new ProductEntity();
    if (domain.id) entity.id = domain.id;
    entity.name = domain.name;
    entity.price = domain.price;
    entity.category = domain.category;
    entity.stock = domain.stock;
    entity.description = domain.description;
    entity.imageUrl = domain.imageUrl;
    return entity;
  }
}
