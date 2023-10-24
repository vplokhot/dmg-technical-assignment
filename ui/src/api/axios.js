import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 10000,
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // use the jwt token
    // const storedData = localStorage.getItem("token");
    // const { token } = storedData;

    const storedData = JSON.parse(localStorage.getItem("vptoken"));

    if (storedData) {
      const { token } = storedData;

      config.headers.Authorization = `Bearer ${token}`;
      // console.log("Sending request with token: ", token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
