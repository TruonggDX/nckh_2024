import axios from "axios";
import { API_KEY, getToken } from '../config/Config.ts';
import { Role } from '../types/Role.ts';
const api=`${API_KEY}/api/role`;
export const getAllRole = async (page:number, size:number): Promise<Role[]> => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list`, {
      params: { page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};