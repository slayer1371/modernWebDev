import Parse from "parse";

export function Register(newUser) {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const LoginUser = async (credentials) => {
  const { username, password } = await credentials; // Expect an object with username and password

  console.log("Attempting to log in user: ", username);

  return Parse.User.logIn(username, password)
    .then((userLoggedIn) => {
      // Do stuff after successful login
      console.log("User logged in successfully: ", userLoggedIn);
      return userLoggedIn;
    })
    .catch((error) => {
      // Error can be caused by wrong parameters or lack of Internet connection
      console.error(`Error logging in: ${error.message}`); // Use console.error for errors
      alert(`Error: ${error.message}`);
      throw error; // Re-throw the error so the caller can handle it
    });
};
