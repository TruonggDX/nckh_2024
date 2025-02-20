import axios from 'axios';
import { API_KEY,getToken } from '../config/Config.ts';

const api = `${API_KEY}/api/inforTeacher`;
export const getAllTeacher = async (page,size) => {
    const token = getToken();
    try {
      const response = await axios.get(`${api}/list`,{
        params: { page, size },
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.data;
    }catch(err){
      console.error(err)
      throw err;
    }
}