import Parse from "parse";

export function isAuthenticated() {
  return !!Parse.User.current();
}

export async function logout() { 
  await Parse.User.logOut();
} 

export async function isAdmin(user) {
  if (!user) return false;
  const query = new Parse.Query(Parse.Role);
  query.equalTo("name", "Admin");
  query.equalTo("users", user);
  const adminRole = await query.first();
  return !!adminRole;
}