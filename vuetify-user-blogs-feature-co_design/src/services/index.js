import Axios from "axios";

export function isValidResponse(resp) {
  return resp && resp.status === 200 && resp.data.status === 1;
}

export const NTO = Axios.create({
  baseURL: "http://ec2-13-233-65-129.ap-south-1.compute.amazonaws.com:8886/v1/api/nto"
});

export const methods = {
  DELETE: "DELETE",
  GET: "GET",
  POST: "POST",
  PUT: "PUT"
};

export class APIError {
  message;

  constructor(msg) {
    this.message = msg;
  }

  get getMessage() {
    return this.message;
  }
}

export const ServiceMaker = async (url, method, data = {}, headers = {}) => {
  try {
    let result;
    let APIInstance = NTO;

    switch (method) {
      case "GET": {
        result = await APIInstance.get(url);
        break;
      }
      case "POST": {
        result = await APIInstance.post(url, data, headers);
        break;
      }
      case "PUT": {
        result = await APIInstance.put(url, data);
        break;
      }
      case "DELETE": {
        result = await APIInstance.delete(url);
        break;
      }
      default: {
        // eslint-disable-next-line no-throw-literal
        throw "InvalidMethod";
      }
    }
    if (!isValidResponse) {
      // eslint-disable-next-line no-throw-literal
      throw "InvalidResponse";
    }
    return result.data;
  } catch (err) {
    throw new APIError(err.response ? err.response.data : "Something went wrong");
  }
};
