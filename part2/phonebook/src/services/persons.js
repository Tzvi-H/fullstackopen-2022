import axios from "axios";
// const baseUrl = "http://localhost:3001/api/persons";
const baseUrl = "https://morning-brook-26510.herokuapp.com/api/persons";
const getAll = () => {
  return axios.get(baseUrl).then(({ data }) => data);
};

const create = (person) => {
  return axios.post(baseUrl, person).then(({ data }) => data);
};

const destroy = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(({ data }) => data);
};

const update = (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person).then(({ data }) => data);
};

const personServices = { getAll, create, destroy, update };

export default personServices;
