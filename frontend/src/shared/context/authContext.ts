import { createContext } from 'react';

interface IAuthContext {
  isLoggedIn: boolean;
  userId?: null | string,
  login: (uid: string) => void,
  logout: () => void
}
export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  userId: null,
  login: (uid: string) => {},
  logout: () => {}
});
