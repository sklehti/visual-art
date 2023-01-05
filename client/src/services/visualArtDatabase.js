import axios from "axios";

const baseUrl = "http://localhost:8080";
// const baseUrl = "";

const getImages = (id) => {
  const request = axios.get(`${baseUrl}/images/${id}`);
  return request.then((response) => response.data);
};

const getAllInfoByYear = () => {
  const request = axios.get(`${baseUrl}/allInfoByYear`);
  return request.then((response) => response.data);
};

const getAllInfo = () => {
  const request = axios.get(`${baseUrl}/allInfo`);
  return request.then((response) => response.data);
};

const getAdmin = (user) => {
  const request = axios.get(
    `${baseUrl}/getAdmin/${user.username}/${user.password}`
  );
  return request.then((response) => response.data);
};

const validateToken = (token) => {
  const request = axios.get(`${baseUrl}/validateToken/${token}`);
  return request.then((response) => response.data);
};

const createTableInfo = (newInfo) => {
  const request = axios.post(`${baseUrl}/imageupload`, newInfo);

  return request.then((response) => response.data);
};

const createAdmin = (newAdmin) => {
  const request = axios.post(`${baseUrl}/createAdmin`, {
    newAdmin,
  });

  return request.then((response) => response.data);
};

const updateImageInfo = (imageInfo) => {
  const request = axios.put(`${baseUrl}/updateImageInfo`, imageInfo);

  return request.then((response) => response.data);
};

const deleteImage = (image) => {
  const request = axios.delete(`${baseUrl}/deleteImage/${image}`);
  return request.then((response) => response.data);
};

export default {
  getImages,
  getAllInfo,
  getAllInfoByYear,
  getAdmin,
  validateToken,
  createTableInfo,
  createAdmin,
  updateImageInfo,
  deleteImage,
};
