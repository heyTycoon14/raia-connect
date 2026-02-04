import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@infrastructure/database/entities/product.entity';
import { OrderEntity } from '@infrastructure/database/entities/order.entity';
import { ProductRepository } from '@infrastructure/repositories/product.repository';
import { OrderRepository } from '@infrastructure/repositories/order.repository';
import { ProductService } from '@application/services/product.service';
import { CheckoutService } from '@application/services/checkout.service';
import { ProductController } from '@presentation/controllers/product.controller';
import { CheckoutController } from '@presentation/controllers/checkout.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, OrderEntity]),
  ],
  controllers: [ProductController, CheckoutController],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
    {
      provide: ProductService,
      useFactory: (productRepository: ProductRepository) => {
        return new ProductService(productRepository);
      },
      inject: ['IProductRepository'],
    },
    {
      provide: CheckoutService,
      useFactory: (
        productRepository: ProductRepository,
        orderRepository: OrderRepository,
        dataSource: any,
      ) => {
        return new CheckoutService(productRepository, orderRepository, dataSource);
      },
      inject: ['IProductRepository', 'IOrderRepository', 'DataSource'],
    },
    ProductRepository,
    OrderRepository,
  ],
  exports: [ProductService, CheckoutService],
})
export class ProductModule {}
