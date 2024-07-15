import axios from "axios";
import getConfig from "next/config";

const api = () => {
  const { publicRuntimeConfig } = getConfig();
  const { API_URL } = publicRuntimeConfig;
  const { apiUrl } = process.env;

  const beerApi = axios.create({
    baseURL: API_URL || apiUrl,
  });

  return {
    beerApi,
  };
};

export default api;
