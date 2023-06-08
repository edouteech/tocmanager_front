import { Category } from '@/types/category';
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api';

async function readCategories(compagnie_id: string, token: string, page: number = 1): Promise<Category[]> {
  const response = await axios.get(`${BASE_URL}/categories`, {
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



async function createCategory(compagnie_id: string, category: Category, token: string): Promise<Category> {
  const { name, parent_id } = category;

  const body = {
    name: name,
    parent_id: parent_id || null,
  };

  const response = await axios.post(`${BASE_URL}/categories`, body, {
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

async function updateCategory(
  compagnie_id: string,
  id: number,
  category: Category,
  token: string,
): Promise<Category> {
  const updatedCategory = { ...category};
  const response = await axios.put(`${BASE_URL}/categories/${id}`, updatedCategory, {
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


async function deleteCategory(compagnie_id: string, id: number, token: string): Promise<void> {
  await axios.delete(`${BASE_URL}/categories/${id}`, {
    params: {
      compagnie_id: compagnie_id,
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
}

export { readCategories, createCategory, updateCategory, deleteCategory };


