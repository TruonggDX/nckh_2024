import axiosInstance from "../route/interceptor.js";

async function login (req) {
    const response = await axiosInstance.post('/auth/login', req);
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    return getUser()
}
async function getUser () {
    const decodedResponse = await axiosInstance.get('/api/account/getUser');
    return decodedResponse.data;
}
export default {login, getUser};