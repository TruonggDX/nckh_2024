import axios from "axios";
import { API_KEY,getToken } from '../config/Config.js';

const api = `${API_KEY}/api/certificate`
export const getAllCertificates = async (page,size) => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list`,{
      params: { page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  }catch(err) {
    console.error(err);
    throw err;
  }
}
export const addCertificate = async (certificate) => {
  const token = getToken();
  try {
    const response = await axios.post(`${api}/create`,certificate,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
export const findCertificateById = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/findById/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
export const updateCertificate = async (id, certificate) => {
  const token = getToken();
  try {
    const response = await axios.put(`${api}/update/${id}`,certificate,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
export const deleteCertificateById = async (id) => {
  const token = getToken();
  try {
    const response = await axios.delete(`${api}/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
