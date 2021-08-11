import { post, get, csrf } from "./Network";

export async function loginAuth(username, password) {
  return await csrf().then(
    async () =>
      await post("/api/login", {
        email: username,
        password: password,
      })
  );
}

export async function checkAuth() {
  return await get("/api/check");
}

export async function logoutAuth() {
  return await csrf().then(async () => await get("/api/logout"));
}
