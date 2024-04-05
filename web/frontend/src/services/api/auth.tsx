import api from "../../utils/axios";

export const registerUser = async (body: {
  name: string;
  phone: number;
  email: string;
  password: string;
}): Promise<any> => {
  try {
    let response = await api.post(`/auth/register`, body);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (body: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    let response = await api.post(`/auth/login`, body);
    return response;
  } catch (error) {
    return error;
  }
};

export const refreshTokenApi = async (body: {
  refresh_token: string;
}): Promise<any> => {
  try {
    const response = await api.post("/auth/refresh-token", body);
    return response;
  } catch (error) {
    return error;
  }
};


export const verifyCredentials = async (body: {
  store : string,
  access_token:string
}): Promise<any> => {
  try {
    const response = await api.post("/auth/store/verification", body);
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchStoreConfiguration = async (body:any): Promise<any> => {
  try {
    let response = await api.post(`/auth/store/configuration`,body);
    return response;
  } catch (error) {
    return error;
  }
};



export const fetchProducts = async (keyword:any,rating:any,currency:any): Promise<any> => {
  try {
    let response = await api.get(`/scrapfly/request-products?keyword=${keyword}&rating=${rating}&currency=${currency}&page=1`);
    // let response = await api.get(`/scrapfly/request-products`);
    return response;
  } catch (error) {
    return error;
  }
};


