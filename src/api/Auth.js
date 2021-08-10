import { post, get } from "./Network";

export async function loginAuth(username, password) {
  return await post("/api/login", {
    email: username,
    password: password,
  });
}

export async function logoutAuth() {
  return await get("/api/logout");
}
