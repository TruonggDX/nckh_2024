import axios from "axios";
import { API_KEY,getToken } from '../config/Config.ts';

const api = `${API_KEY}/api/coursedetails`
export const getCourseDetails = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch(err) {
    console.log(err);
    throw err;
  }
}