import axiosInstance from "../route/interceptor.js";
const apiBill = '/api/bill/getBillByEmail'
const apiBillDetails = '/api/bill_details/list'

async function getBillByEmail() {
    const response = await axiosInstance.get(`${apiBill}`);
    return response.data;
}
async function getBillDetailById(billId) {
    const response = await axiosInstance.get(`${apiBillDetails}/${billId}`);
    return response.data;
}
export default {getBillByEmail,getBillDetailById};