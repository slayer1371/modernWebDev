import Parse from "parse";

export function isAuthenticated() {
  return !!Parse.User.current();
}

export async function logout() {
  await Parse.User.logOut();
} 