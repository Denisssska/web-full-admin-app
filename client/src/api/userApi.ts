import customFetch from '../components/hooks/customFetch';

import { SignInSchemaType, SignUpSchemaType } from '../utils';

export const userApi = {
  async signIn({ email, password }: SignInSchemaType) {
    return await fetch(`/auth/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  },
  async logout() {
    return await fetch(`/auth/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },
  async registration({ email, password, username }: SignUpSchemaType) {
    return await fetch(`/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });
  },

  async updateUser(data: UpdateUser) {
    // const userId = data.get('_id');
    return await customFetch(`/user/update/${data._id}`, {
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
  async updateUserImg(data: FormData) {
    return await fetch(`${import.meta.env.VITE_CLOUDY_PORT}/image/upload`, {
      method: 'POST',
      body: data,
    });
  },
};
