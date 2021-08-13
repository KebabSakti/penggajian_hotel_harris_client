import { post, get } from "./Network";

export async function fetchSalaries(datas, params) {
  return await post("/api/salary", datas, params);
}

export async function fetchSalaryFormData() {
  return await get("/api/mix/salary_form_data");
}

export async function addSalary(datas) {
  return await post("api/salary/create", datas);
}

export async function updateSalary(datas) {
  return await post("api/salary/update", datas);
}
