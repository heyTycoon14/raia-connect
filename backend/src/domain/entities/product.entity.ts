export class Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }

  hasStock(quantity: number = 1): boolean {
    return this.stock >= quantity;
  }

  decrementStock(quantity: number = 1): void {
    if (!this.hasStock(quantity)) {
      throw new Error(`Insufficient stock for product ${this.name}`);
    }
    this.stock -= quantity;
  }

  updateStock(newStock: number): void {
    if (newStock < 0) {
      throw new Error('Stock cannot be negative');
    }
    this.stock = newStock;
  }
}
