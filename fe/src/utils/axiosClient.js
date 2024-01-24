import axios from "axios";
const axiosClient = axios.create({
  baseURL: `http://localhost:5001/api/v1`,
});

// custom response
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
