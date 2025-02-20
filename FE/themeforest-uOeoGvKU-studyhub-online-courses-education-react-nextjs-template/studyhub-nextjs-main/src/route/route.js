import axiosInstance from "../route/interceptor.js";

async function login (req) {
    const response = await axiosInstance.post('/auth/login', req);
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    return getUser()
}
async function signUp (req) {
    const response = await axiosInstance.post('/auth/signup', req);
    return response.data;
}
async function verifyOtp (req) {
    const response = await axiosInstance.post('/auth/verify', req);
    return response.data;
}
async function getUser () {
    const decodedResponse = await axiosInstance.get('/api/account/getUser');
    return decodedResponse.data;
}
async function resendCode(req){
    const response = await axiosInstance.post(`/auth/resend?email=${req}`);
}
async function getCategory () {
    const response = await axiosInstance.get(`/api/category/list`);
    return response.data;
}
async function getCourse () {
    const response = await axiosInstance.get(`/api/course/list`);
    return response.data;
}

export default {login, getUser,signUp, verifyOtp,resendCode, getCategory, getCourse};