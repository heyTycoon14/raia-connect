import { DataSource } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { OrderEntity } from './entities/order.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'raiaconnect',
  entities: [ProductEntity, OrderEntity],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
});
