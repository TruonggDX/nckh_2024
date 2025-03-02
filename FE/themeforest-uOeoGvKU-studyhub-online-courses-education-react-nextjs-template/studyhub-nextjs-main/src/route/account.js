import axiosInstance from "../route/interceptor.js";

async function changePassword(id, req) {
    const response = await axiosInstance.put(`/api/account/updatePassWord/${id}`, req);
    return response.data;
}

export default { changePassword };
