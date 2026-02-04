import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { ProductEntity } from '../entities/product.entity';

const seedProducts = async () => {
  console.log('🌱 Starting database seed...');
  
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established');

    const productRepository = AppDataSource.getRepository(ProductEntity);

    // Clear existing products
    await productRepository.clear();
    console.log('🗑️  Cleared existing products');

    // Seed initial products
    const products: Partial<ProductEntity>[] = [
      {
        name: 'Aspirin',
        price: 9.99,
        category: 'Pain Relief',
        stock: 50,
        description: 'Effective pain relief and fever reducer. 500mg tablets.',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
      },
      {
        name: 'Vitamin C',
        price: 15.99,
        category: 'Supplements',
        stock: 100,
        description: 'High-potency Vitamin C supplement. 1000mg per serving.',
        imageUrl: 'https://images.unsplash.com/photo-1550572017-4764225d0534?w=400',
      },
      {
        name: 'Sunscreen SPF 50',
        price: 22.50,
        category: 'Skincare',
        stock: 30,
        description: 'Broad-spectrum sun protection. Water-resistant formula.',
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      },
      {
        name: 'Hand Sanitizer',
        price: 5.99,
        category: 'Hygiene',
        stock: 200,
        description: 'Alcohol-based hand sanitizer. Kills 99.9% of germs.',
        imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400',
      },
      {
        name: 'Face Mask (50 pack)',
        price: 12.99,
        category: 'Hygiene',
        stock: 75,
        description: 'Disposable 3-ply face masks. Box of 50.',
        imageUrl: 'https://images.unsplash.com/photo-1603217039863-aa16f6d8b680?w=400',
      },
    ];

    await productRepository.save(products);
    console.log('✅ Seeded 5 products successfully');

    const count = await productRepository.count();
    console.log(`📊 Total products in database: ${count}`);

    await AppDataSource.destroy();
    console.log('🎉 Seed completed successfully!');
  } catch (error) {
    console.error('❌ Error during seed:', error);
    process.exit(1);
  }
};

seedProducts();
