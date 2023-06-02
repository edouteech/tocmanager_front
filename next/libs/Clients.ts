import { Client } from '@/types/client';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

async function readClients(compagnie_id: string, token: string, page: number = 1): Promise<Client[]> {
  const response = await axios.get(`${BASE_URL}/clients`, {
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

async function createClient(compagnie_id: string, client: Client, token: string): Promise<Client> {
  const { id, name, email, nature } = client;

  const body = {
    id: id,
    name: name,
    email: email,
    nature: nature,
  };

  const response = await axios.post(`${BASE_URL}/clients`, body, {
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

async function updateClient(compagnie_id: string, id: string, client: Client, token: string): Promise<Client> {
  const updatedClient = { ...client };
  const response = await axios.put(`${BASE_URL}/clients/${id}`, updatedClient, {
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

async function deleteClient(compagnie_id: string, id: string, token: string): Promise<void> {
  await axios.delete(`${BASE_URL}/clients/${id}`, {
    params: {
      compagnie_id: compagnie_id,
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
}

export { readClients, createClient, updateClient, deleteClient };
