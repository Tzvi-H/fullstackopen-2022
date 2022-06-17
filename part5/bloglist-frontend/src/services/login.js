import axios from "axios";
const baseUrl = "/api/login";

const login = (loginInfo) => {
  return axios.post(baseUrl, loginInfo).then(({ data }) => data);
};

const loginService = { login };

export default loginService;
