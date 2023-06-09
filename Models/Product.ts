import { Category } from "./Category";

export interface Product {
    id: number;
    category_id: number;
    name: string;
    code: string;
    compagnie_id: number;
    created_at: string;
    deleted_at: string | null;
    price_buy: number;
    price_sell: number;
    quantity: number;
    stock_min: number;
    stock_max: number;
    image:string;
    reference: string;
    stock_initial: number;
    tax_group: string | null;
    category?: Category; 
  }
  