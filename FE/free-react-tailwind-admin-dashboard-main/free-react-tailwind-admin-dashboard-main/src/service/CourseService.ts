import axios from 'axios';
import {API_KEY,getToken} from '../config/Config.js'

const api = `${API_KEY}/api/course`;

export const getCourses = async (page, size) => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list`,{
      params: { page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const findCouseById = async (id) => {
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
export const deleteCourse = async (id) => {
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