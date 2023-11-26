import customFetch from '../components/hooks/customFetch';

import { SignInSchemaType, SignUpSchemaType } from '../utils';

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

  updateProduct(data: ProductCreation) {
    // const userId = data.get('_id');
    return customFetch(`/user/update/${data._id}`, {
      method: 'PATCH',
      // body: data,
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
