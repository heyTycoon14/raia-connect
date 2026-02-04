import { Controller, Get, Query, Param, NotFoundException } from '@nestjs/common';
import { ProductService } from '@application/services/product.service';
import { ProductDto } from '../dtos/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query('category') category?: string): Promise<ProductDto[]> {
    const products = await this.productService.findAll(category);
    return products.map(product => this.toDto(product));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    const product = await this.productService.findById(id);
    return this.toDto(product);
  }

  private toDto(product: any): ProductDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      description: product.description,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
