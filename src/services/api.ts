// src/services/api.ts
import axios from 'axios';

export const login = (username: string, password: string) => {
  return axios.post('https://fakestoreapi.com/auth/login', { username, password });
};

export const signup = (data: any) => {
  return axios.post('https://fakestoreapi.com/users', data);
};

export const fetchProducts = () => {
  return axios.get('https://fakestoreapi.com/products');
};
