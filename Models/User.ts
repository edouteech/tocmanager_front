export interface Role {
    id: number;
    name: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    pivot: RolePivot;
  }
  
  export interface RolePivot {
    user_id: number;
    role_id: number;
    id: number;
    droits_ventes: number;
    droits_utilisateurs: number;
    droits_tresorerie: number;
    droits_stock: number;
    droits_add: number;
    droits_edition: number;
    droits_delete: number;
    droits_admin: number;
    droits_super_admin: number;
    compagnie_id: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface Compagnie {
    id: number;
    name: string;
    email: string;
    phone: string;
    register_number: string | null;
    rccm: string | null;
    address: string | null;
    mecef_token: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    logo: string | null;
    is_virtual: number;
    pivot: CompagniePivot;
  }
  
  export interface CompagniePivot {
    user_id: number;
    compagnie_id: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string | null;
    city: string | null;
    country: string;
    state: number;
    email_verified_at: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    is_virtual: number;
    roles: Role[];
    compagnies: Compagnie[];
    access_token: string;
  }
  
  