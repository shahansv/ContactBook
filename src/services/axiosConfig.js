import axios from "axios";

const axiosConfig = async (method, url, reqBody) => {
  let axiosConfigObj = {
    method: method,
    url: url,
    data: reqBody,
  };
  return await axios(axiosConfigObj)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export default axiosConfig;
