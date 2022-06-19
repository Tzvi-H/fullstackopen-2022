import axios from "axios";
const baseUrl = "/api/blogs";

let token;
const setToken = (newToken) => (token = newToken);

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blogInfo) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.post(baseUrl, blogInfo, config);
  return response.data;
};

const update = async (blogId, blogInfo) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, blogInfo);
  return response.data;
};

const destroy = async (blogId) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

const blogService = { getAll, create, setToken, update, destroy };

export default blogService;
