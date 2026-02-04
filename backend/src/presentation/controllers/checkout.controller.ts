import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CheckoutService } from '@application/services/checkout.service';
import { CheckoutDto } from '../dtos/checkout.dto';
import { OrderDto } from '../dtos/order.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async checkout(@Body() checkoutDto: CheckoutDto): Promise<OrderDto> {
    const order = await this.checkoutService.processCheckout(
      checkoutDto.productId,
      checkoutDto.quantity || 1,
    );
    
    return this.toDto(order);
  }

  private toDto(order: any): OrderDto {
    return {
      id: order.id,
      productId: order.productId,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
    };
  }
}
