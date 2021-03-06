import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export async function csrf() {
  return await instance.get("/sanctum/csrf-cookie");
}

export async function get(path, params) {
  return await instance.get(path, {
    params: params,
  });
}

export async function post(path, datas, params) {
  return await instance.post(path, datas, { params: params });
}

export async function upload(path, fields, params) {
  const formData = new FormData();

  fields.forEach((item) => {
    formData.append(item.field, item.name);
  });

  return await instance.post(
    path,
    formData,
    { params: params },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
}
