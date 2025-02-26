import axios from "axios";
import { API_KEY, getToken } from "../config/Config";
import { Grade } from "../types/Grade";

const api = `${API_KEY}/api/grade`;

export const getGrades = async (page:number, size:number): Promise<Grade[]> => {
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
}

export const findGradeById = async (id:number) => {
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

  export const deleteGrade = async (id:number) => {
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

  export const addGrade = async (grade: Grade) => {
    const token = getToken();
    try{
      const response = await axios.post(`${api}`, grade, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      return response.data;
    }catch(error){
      console.log(error);
      throw error;
    }
  }

  export const updateGrade = async (id:number, grade:Grade) => {
    const token = getToken();
    try {
      const response = await axios.put(`${api}/update/${id}`,grade,{
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.data;
    }catch (error) {
      console.error(error);
      throw error;
    }
  }