import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then(({ data }) => data);
};

const create = (person) => {
  return axios.post(baseUrl, person).then(({ data }) => data);
};

const personServices = { getAll, create };

export default personServices;
