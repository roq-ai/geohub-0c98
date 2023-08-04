import axios from 'axios';
import queryString from 'query-string';
import { FieldworkDataInterface, FieldworkDataGetQueryInterface } from 'interfaces/fieldwork-data';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFieldworkData = async (
  query?: FieldworkDataGetQueryInterface,
): Promise<PaginatedInterface<FieldworkDataInterface>> => {
  const response = await axios.get('/api/fieldwork-data', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFieldworkData = async (fieldworkData: FieldworkDataInterface) => {
  const response = await axios.post('/api/fieldwork-data', fieldworkData);
  return response.data;
};

export const updateFieldworkDataById = async (id: string, fieldworkData: FieldworkDataInterface) => {
  const response = await axios.put(`/api/fieldwork-data/${id}`, fieldworkData);
  return response.data;
};

export const getFieldworkDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/fieldwork-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFieldworkDataById = async (id: string) => {
  const response = await axios.delete(`/api/fieldwork-data/${id}`);
  return response.data;
};
