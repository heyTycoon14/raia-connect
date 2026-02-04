import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { Order } from '@domain/entities/order.entity';
import { OrderEntity } from '../database/entities/order.entity';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async create(order: Order): Promise<Order> {
    const entity = this.toEntity(order);
    const saved = await this.orderRepository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Order | null> {
    const entity = await this.orderRepository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Order[]> {
    const entities = await this.orderRepository.find();
    return entities.map(entity => this.toDomain(entity));
  }

  private toDomain(entity: OrderEntity): Order {
    return new Order({
      id: entity.id,
      productId: entity.productId,
      quantity: entity.quantity,
      totalPrice: Number(entity.totalPrice),
      status: entity.status as any,
      createdAt: entity.createdAt,
    });
  }

  private toEntity(domain: Order): OrderEntity {
    const entity = new OrderEntity();
    if (domain.id) entity.id = domain.id;
    entity.productId = domain.productId;
    entity.quantity = domain.quantity;
    entity.totalPrice = domain.totalPrice;
    entity.status = domain.status as any;
    return entity;
  }
}
