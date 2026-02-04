import { useState } from 'react';
import apiService from '../services/api.service';
import { CheckoutRequest, Order } from '../models/types';

export const useCheckout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [order, setOrder] = useState<Order | null>(null);

  const processCheckout = async (request: CheckoutRequest): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const result = await apiService.checkout(request);
      setOrder(result);
      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.message || 'Checkout failed');
      setSuccess(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetCheckout = () => {
    setError(null);
    setSuccess(false);
    setOrder(null);
  };

  return {
    loading,
    error,
    success,
    order,
    processCheckout,
    resetCheckout,
  };
};
