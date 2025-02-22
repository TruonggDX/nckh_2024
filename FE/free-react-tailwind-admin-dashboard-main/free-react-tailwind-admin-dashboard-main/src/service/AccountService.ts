import axios from 'axios';
import { API_KEY, getToken } from '../config/Config.ts';
import { ChangePassword } from '../types/ChangePassword.ts';
import { toast } from 'react-toastify';
import error = toast.error;

const api = `${API_KEY}/api/account`;
export const changePassword = async (id:number,changePasswordRequest:ChangePassword) =>{
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
export const getAllAccount = async (page:number,size:number) =>{
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list`, {
      params: { page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error){
    console.error(error);
    throw error;
  }
}
export const deleteAccount = async (id:number) =>{
  const token = getToken();
  try {
    const response = await axios.delete(`${api}/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
  }catch (e) {
    console.error(e);
    throw error;
  }
}
export const findAccountById = async (id:number) =>{
  const token = getToken();
  try {
    const response = await axios.get(`${api}/findById/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (e) {
    console.error(e);
    throw error;
  }
}
export const updateAccount = async (id: number, updateForm: FormData) => {
  const token = getToken();

  try {
    const response = await axios.put(`${api}/update/${id}`, updateForm, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
