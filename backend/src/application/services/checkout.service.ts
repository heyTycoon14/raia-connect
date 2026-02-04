import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { Order, OrderStatus } from '@domain/entities/order.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly orderRepository: IOrderRepository,
    private readonly dataSource: DataSource,
  ) {}

  async processCheckout(productId: string, quantity: number = 1): Promise<Order> {
    // Use transaction to ensure ACID compliance
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find product and check stock
      const product = await this.productRepository.findById(productId);
      
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      if (!product.hasStock(quantity)) {
        throw new BadRequestException(
          `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${quantity}`,
        );
      }

      // Decrement stock
      await this.productRepository.decrementStock(productId, quantity);

      // Create order
      const order = new Order({
        productId: product.id,
        quantity,
        totalPrice: product.price * quantity,
        status: OrderStatus.COMPLETED,
        createdAt: new Date(),
      });

      const savedOrder = await this.orderRepository.create(order);

      // Commit transaction
      await queryRunner.commitTransaction();

      return savedOrder;
    } catch (error) {
      // Rollback on error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}
