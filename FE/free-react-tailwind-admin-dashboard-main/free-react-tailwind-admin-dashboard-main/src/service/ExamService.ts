import axios from "axios";
import { API_KEY, getToken } from '../config/Config.ts';
const api = `${API_KEY}/api/exam`;
export const getAllExams = async (page:number,size:number) =>{
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list`,{
      params:{page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}