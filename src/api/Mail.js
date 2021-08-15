import { post } from "./Network";

export async function emailSalarySlip(datas) {
  return await post("/api/mail/salary", datas);
}
