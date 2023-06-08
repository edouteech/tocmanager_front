export interface Product {
    id?: number;
    name: string;
    quantity: number;
    price_sell: number;
    price_buy: number;
    created_at?: string;
    category_id?:number;
    stock_min:number;
    stock_max:number;
    code:string;
  }
  