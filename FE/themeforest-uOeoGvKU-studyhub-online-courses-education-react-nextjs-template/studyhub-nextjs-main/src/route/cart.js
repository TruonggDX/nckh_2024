import axiosInstance from "../route/interceptor.js";
const api = '/api/cart'

async function getAllCart() {
    const response = await axiosInstance.get(`${api}/list`);
    return response.data;
}

export default {getAllCart};