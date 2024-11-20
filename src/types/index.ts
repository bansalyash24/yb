// src/types/index.ts
export interface User {
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    firstname: string;
    lastname: string;
  }
  
  export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }
  