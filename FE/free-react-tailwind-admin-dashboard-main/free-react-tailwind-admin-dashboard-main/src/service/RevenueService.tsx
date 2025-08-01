import { API_KEY, getToken } from '../config/Config.ts';
import axios from 'axios';

const api = `${API_KEY}/api/revenue`;

export const getRevenueByYear = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/year`, {
      headers: {'Authorization': `Bearer ${token}`},
    });
    return response.data;
  }catch(err) {
    console.error(err);
    throw err;
  }
}

export const getRevenueByMonth = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/month`, {
      headers: {'Authorization': `Bearer ${token}`},
    })
    return response.data;
  }catch(err) {
    console.error(err);
    throw err;
  }
}

export const getRevenueByWeek = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/week`, {
      headers: {'Authorization': `Bearer ${token}`},
    });
    return response.data;
  }catch(err) {
    console.error(err);
    throw err;
  }
}

export const getRevenueByCourse = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/course`, {
      headers: {'Authorization': `Bearer ${token}`},
    });
    return response.data;
  }catch(err) {
    console.error(err);
    throw err;
  }
}

export const exportToExcel = async (startDate: string, endDate: string) => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/export`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        startDate,
        endDate
      },
      responseType: 'blob'
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

