import axiosInstance from "../route/interceptor.js";
const api = '/api/payment';

async function createVNPay(amount,bankCode) {
    try {
        const response = await axiosInstance.get(`${api}/vn-pay`, {
            params: { amount,bankCode }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
async function handleVNPayReturn(query) {
    const response = await axiosInstance.get(`/api/payment/vnpay_return`, { params: query });
    return response.data;
}

export default { createVNPay, handleVNPayReturn };