import axios from "axios";

export const GET_AWARDS = (params) => {
  return axios.get(`/awards?${params}`);
};
