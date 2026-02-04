import { useState, useEffect, useCallback } from 'react';
import { Product } from '../models/types';
import apiService from '../services/api.service';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadProducts = useCallback(async (category?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProducts(category);
      setProducts(data);
      setFilteredProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filterProducts = useCallback(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const selectCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  const search = (query: string) => {
    setSearchQuery(query);
  };

  const refresh = () => {
    loadProducts(selectedCategory || undefined);
  };

  const getCategories = (): string[] => {
    const categories = products.map(p => p.category);
    return Array.from(new Set(categories)).sort();
  };

  return {
    products: filteredProducts,
    allProducts: products,
    loading,
    error,
    selectedCategory,
    searchQuery,
    selectCategory,
    search,
    refresh,
    getCategories,
  };
};
