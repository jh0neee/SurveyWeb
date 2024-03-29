import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null, //최초 값
  token: null,
  login: () => {},
  logout: () => {},
});
