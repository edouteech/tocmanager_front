export interface Category {
  id: number;
  name: string;
  parent_id?: number | null;
  parent?: {
    id: number;
    name: string;
    parent_id: number | null;
    compagnie_id: number;
    deleted_at: string | null;
  };
  created_at: string;
  stock_produit : number;
  valorisation : number;
}
