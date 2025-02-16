import axiosInstance from "../route/interceptor.js";

async function getUser () {
  // localStorage.getItem("token");
  const decodedResponse = await axiosInstance.get('/api/account/getUser');
  return decodedResponse.data;
}
export default { getUser};
