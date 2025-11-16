import axiosConfig from "./axiosConfig";
import { baseURL } from "./baseURL";

export const addContact = async (reqBody) => {
  return await axiosConfig("post", `${baseURL}/contact`, reqBody);
};

export const getContacts = async () => {
  return await axiosConfig("get", `${baseURL}/contact`, "");
};

export const deleteContact = async (id) => {
  return await axiosConfig("delete", `${baseURL}/contact/${id}`, {});
};

export const editContact = async (id, reqBody) => {
  return await axiosConfig("patch", `${baseURL}/contact/${id}`, reqBody);
};

export const updateFavorite = async (id, reqBody) => {
  return await axiosConfig("patch", `${baseURL}/contact/${id}`, reqBody);
};

