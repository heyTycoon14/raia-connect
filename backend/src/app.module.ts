import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product.module';
import { ProductEntity } from '@infrastructure/database/entities/product.entity';
import { OrderEntity } from '@infrastructure/database/entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'raiaconnect',
      entities: [ProductEntity, OrderEntity],
      synchronize: process.env.NODE_ENV === 'development',
      logging: false,
    }),
    ProductModule,
  ],
})
export class AppModule {}
