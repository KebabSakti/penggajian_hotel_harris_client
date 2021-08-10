import { post } from "./Network";

export async function fetchSalaries(datas, params) {
  return await post("/api/salary", datas, params);
}
