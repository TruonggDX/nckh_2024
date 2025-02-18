import axiosInstance from "../route/interceptor.js";

async function getUser () {
  const decodedResponse = await axiosInstance.get('/api/account/getUser');
  return decodedResponse.data;
}
export default { getUser};
