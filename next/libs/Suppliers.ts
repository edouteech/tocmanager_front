import { Supplier } from '@/types/supplier';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';
async function readSuppliers(compagnie_id: string, token: string, page: number = 1): Promise<Supplier[]> {
  const response = await axios.get(`${BASE_URL}/suppliers`, {
    params: {
      compagnie_id: compagnie_id,
      page: page,
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
}

async function createSupplier(compagnie_id: string, supplier: Supplier, token: string): Promise<Supplier> {
  const { id, name, email, nature } = supplier;

  const body = {
    id: id,
    name: name,
    email: email,
    nature: nature,
  };

  const response = await axios.post(`${BASE_URL}/suppliers`, body, {
    params: {
      compagnie_id: compagnie_id,
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
}

async function updateSupplier(compagnie_id: string, id: string, supplier: Supplier, token: string): Promise<Supplier> {
  const updatedSupplier = { ...supplier };
  const response = await axios.put(`${BASE_URL}/suppliers/${id}`, updatedSupplier, {
    params: {
      compagnie_id: compagnie_id,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function deleteSupplier(compagnie_id: string, id: string, token: string): Promise<void> {
  await axios.delete(`${BASE_URL}/suppliers/${id}`, {
    params: {
      compagnie_id: compagnie_id,
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
}

export { readSuppliers, createSupplier, updateSupplier, deleteSupplier };
