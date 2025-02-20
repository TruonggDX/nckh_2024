import axios from "axios";
import { API_KEY, getToken } from '../config/Config.ts';

const apiListCategories = `${API_KEY}/api/category`;

export const listCategories = async (page, size) => {
  const token = getToken();
  try {
    const response = await axios.get(`${apiListCategories}/list`, {
      params: { page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  const token = getToken();
  try {
    const response = await axios.delete(`${apiListCategories}/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getCategoryById = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${apiListCategories}/findById/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
export const updateCategory = async (id, category) => {
  const token = getToken();
  try {
    const response = await axios.put(`${apiListCategories}/update/${id}`, category, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
export const addCategory =async (category) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiListCategories}`,category, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}