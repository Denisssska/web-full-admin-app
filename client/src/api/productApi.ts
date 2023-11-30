import customFetch from '../components/hooks/customFetch';

import { ProductsSchemaType } from '../utils';

export const productApi = {
  async create(data: ProductCreation) {
    return await customFetch(`/products/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
  async getAll() {
    return await customFetch(`/products/all`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },

  updateProduct(data: ProductsSchemaType) {
    return customFetch(`/products/update/${data._id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },
  async updateProductImg(data: FormData) {
    return await fetch(`${import.meta.env.VITE_CLOUDY_PORT}/image/upload`, {
      method: 'POST',
      body: data,
    });
  },

  getProduct(productId: string) {
    return customFetch(`/products/${productId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },
};
