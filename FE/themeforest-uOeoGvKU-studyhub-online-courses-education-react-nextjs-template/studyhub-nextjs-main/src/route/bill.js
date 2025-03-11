import axiosInstance from "../route/interceptor.js";
const apiBill = '/api/bill'
const apiBillDetails = '/api/bill_details'

async function getBillByEmail() {
    const response = await axiosInstance.get(`${apiBill}/getBillByEmail`);
    return response.data;
}
async function getBillDetailById(billId) {
    const response = await axiosInstance.get(`${apiBillDetails}/list/${billId}`);
    return response.data;
}
async function createBill(req){
    const response = await axiosInstance.post(`${apiBill}/create`, req);
    return response.data;
}
async function createBillDetails(req) {
    const response = await axiosInstance.post(`${apiBillDetails}/create`, req);
    return response.data;
}
export default {getBillByEmail,getBillDetailById,createBillDetails,createBill};