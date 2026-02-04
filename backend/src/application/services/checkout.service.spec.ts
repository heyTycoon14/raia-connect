import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { IProductRepository } from '@domain/repositories/product.repository.interface';
import { IOrderRepository } from '@domain/repositories/order.repository.interface';
import { Product } from '@domain/entities/product.entity';
import { Order, OrderStatus } from '@domain/entities/order.entity';
import { DataSource } from 'typeorm';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let productRepository: jest.Mocked<IProductRepository>;
  let orderRepository: jest.Mocked<IOrderRepository>;
  let dataSource: jest.Mocked<DataSource>;
  let queryRunner: any;

  beforeEach(async () => {
    // Mock QueryRunner
    queryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
    };

    // Mock DataSource
    dataSource = {
      createQueryRunner: jest.fn().mockReturnValue(queryRunner),
    } as any;

    // Mock repositories
    productRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      decrementStock: jest.fn(),
    } as any;

    orderRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutService,
        { provide: 'IProductRepository', useValue: productRepository },
        { provide: 'IOrderRepository', useValue: orderRepository },
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    service = module.get<CheckoutService>(CheckoutService);
  });

  describe('processCheckout', () => {
    it('should successfully process checkout with sufficient stock', async () => {
      // Arrange
      const productId = '123e4567-e89b-12d3-a456-426614174000';
      const quantity = 2;
      const mockProduct = new Product({
        id: productId,
        name: 'Aspirin',
        price: 9.99,
        category: 'Pain Relief',
        stock: 10,
        description: 'Test product',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const mockOrder = new Order({
        id: '123e4567-e89b-12d3-a456-426614174001',
        productId,
        quantity,
        totalPrice: 19.98,
        status: OrderStatus.COMPLETED,
        createdAt: new Date(),
      });

      productRepository.findById.mockResolvedValue(mockProduct);
      productRepository.decrementStock.mockResolvedValue(undefined);
      orderRepository.create.mockResolvedValue(mockOrder);

      // Act
      const result = await service.processCheckout(productId, quantity);

      // Assert
      expect(result).toEqual(mockOrder);
      expect(productRepository.findById).toHaveBeenCalledWith(productId);
      expect(productRepository.decrementStock).toHaveBeenCalledWith(productId, quantity);
      expect(orderRepository.create).toHaveBeenCalled();
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(queryRunner.rollbackTransaction).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when product does not exist', async () => {
      // Arrange
      const productId = 'non-existent-id';
      productRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.processCheckout(productId, 1)).rejects.toThrow(NotFoundException);
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(queryRunner.commitTransaction).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when stock is insufficient', async () => {
      // Arrange
      const productId = '123e4567-e89b-12d3-a456-426614174000';
      const quantity = 10;
      const mockProduct = new Product({
        id: productId,
        name: 'Aspirin',
        price: 9.99,
        category: 'Pain Relief',
        stock: 5, // Less than requested quantity
        description: 'Test product',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      productRepository.findById.mockResolvedValue(mockProduct);

      // Act & Assert
      await expect(service.processCheckout(productId, quantity)).rejects.toThrow(BadRequestException);
      expect(productRepository.decrementStock).not.toHaveBeenCalled();
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(queryRunner.commitTransaction).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when stock is zero', async () => {
      // Arrange
      const productId = '123e4567-e89b-12d3-a456-426614174000';
      const mockProduct = new Product({
        id: productId,
        name: 'Aspirin',
        price: 9.99,
        category: 'Pain Relief',
        stock: 0,
        description: 'Test product',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      productRepository.findById.mockResolvedValue(mockProduct);

      // Act & Assert
      await expect(service.processCheckout(productId, 1)).rejects.toThrow(BadRequestException);
      await expect(service.processCheckout(productId, 1)).rejects.toThrow(/Insufficient stock/);
    });

    it('should calculate correct total price for multiple quantities', async () => {
      // Arrange
      const productId = '123e4567-e89b-12d3-a456-426614174000';
      const quantity = 3;
      const price = 10.50;
      const mockProduct = new Product({
        id: productId,
        name: 'Vitamin C',
        price: price,
        category: 'Supplements',
        stock: 100,
        description: 'Test product',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      productRepository.findById.mockResolvedValue(mockProduct);
      productRepository.decrementStock.mockResolvedValue(undefined);
      
      let capturedOrder: Order;
      orderRepository.create.mockImplementation(async (order: Order) => {
        capturedOrder = order;
        return { ...order, id: '123e4567-e89b-12d3-a456-426614174001' };
      });

      // Act
      await service.processCheckout(productId, quantity);

      // Assert
      expect(capturedOrder.totalPrice).toBe(price * quantity);
      expect(capturedOrder.quantity).toBe(quantity);
    });

    it('should rollback transaction on repository error', async () => {
      // Arrange
      const productId = '123e4567-e89b-12d3-a456-426614174000';
      const mockProduct = new Product({
        id: productId,
        name: 'Aspirin',
        price: 9.99,
        category: 'Pain Relief',
        stock: 10,
        description: 'Test product',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      productRepository.findById.mockResolvedValue(mockProduct);
      productRepository.decrementStock.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(service.processCheckout(productId, 1)).rejects.toThrow('Database error');
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(queryRunner.commitTransaction).not.toHaveBeenCalled();
    });
  });

  describe('getOrderById', () => {
    it('should return order when found', async () => {
      // Arrange
      const orderId = '123e4567-e89b-12d3-a456-426614174001';
      const mockOrder = new Order({
        id: orderId,
        productId: '123e4567-e89b-12d3-a456-426614174000',
        quantity: 1,
        totalPrice: 9.99,
        status: OrderStatus.COMPLETED,
        createdAt: new Date(),
      });

      orderRepository.findById.mockResolvedValue(mockOrder);

      // Act
      const result = await service.getOrderById(orderId);

      // Assert
      expect(result).toEqual(mockOrder);
      expect(orderRepository.findById).toHaveBeenCalledWith(orderId);
    });

    it('should throw NotFoundException when order not found', async () => {
      // Arrange
      const orderId = 'non-existent-id';
      orderRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.getOrderById(orderId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAllOrders', () => {
    it('should return all orders', async () => {
      // Arrange
      const mockOrders = [
        new Order({
          id: '1',
          productId: 'p1',
          quantity: 1,
          totalPrice: 9.99,
          status: OrderStatus.COMPLETED,
          createdAt: new Date(),
        }),
        new Order({
          id: '2',
          productId: 'p2',
          quantity: 2,
          totalPrice: 19.98,
          status: OrderStatus.COMPLETED,
          createdAt: new Date(),
        }),
      ];

      orderRepository.findAll.mockResolvedValue(mockOrders);

      // Act
      const result = await service.getAllOrders();

      // Assert
      expect(result).toEqual(mockOrders);
      expect(result).toHaveLength(2);
    });
  });
});
