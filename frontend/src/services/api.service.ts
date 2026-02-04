import axios, { AxiosInstance } from 'axios';
import { Product, Order, CheckoutRequest } from '../models/types';

const API_BASE_URL = 'http://localhost:3000';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getProducts(category?: string): Promise<Product[]> {
    try {
      const params = category ? { category } : {};
      const response = await this.api.get<Product[]>('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products. Please check your connection.');
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await this.api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product details.');
    }
  }

  async checkout(request: CheckoutRequest): Promise<Order> {
    try {
      const response = await this.api.post<Order>('/checkout', request);
      return response.data;
    } catch (error: any) {
      console.error('Error during checkout:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      
      if (error.response?.status === 400) {
        throw new Error('Insufficient stock or invalid request.');
      }
      
      if (error.response?.status === 404) {
        throw new Error('Product not found.');
      }
      
      throw new Error('Checkout failed. Please try again.');
    }
  }
}

export default new ApiService();
