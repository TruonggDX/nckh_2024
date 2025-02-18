import axios from 'axios';
import { API_KEY, getToken } from '../config/Config.js';
const api = `${API_KEY}/api/account`;
export const changePassword = async (id,changePasswordRequest) =>{
  const token = getToken();
  try {
    const response =await axios.put(`${api}/updatePassWord/${id}`,changePasswordRequest,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}