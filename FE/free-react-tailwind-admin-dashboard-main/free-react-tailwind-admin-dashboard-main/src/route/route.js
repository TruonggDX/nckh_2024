import axiosInstance from "../route/interceptor.js";

async function getUser () {
  localStorage.removeItem("token");
  const decodedResponse = await axiosInstance.get('/api/account/getUser');
  return decodedResponse.data;
}
export default { getUser};