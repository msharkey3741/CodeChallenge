import axios from "axios";
import * as helper from "./serviceHelpers";

const addAdvertiser = values => {
  const config = {
    data: values,
    method: "POST",
    url: helper.API_HOST_PREFIX + `/api/adver/`
  };
  return axios(config)
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError);
};
let getAllAdvertiser = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url:
      helper.API_HOST_PREFIX +
      `/api/adver/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-type": "application/json"
    }
  };
  return axios(config)
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError);
};
export { addAdvertiser, getAllAdvertiser };
