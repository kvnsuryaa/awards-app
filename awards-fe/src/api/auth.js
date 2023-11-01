import axios from "axios";

export const LOGIN = (payload) => {
  return axios.post(`/login`, payload);
};
