/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'types';
import jwt_decode from 'jwt-decode';

interface UserContextData {
  user: User;
  userLoading: boolean;
}

const initialValue: User = { name: '', _id: '' };

const UserContext = createContext<UserContextData>({
  user: initialValue,
  userLoading: true,
});

function useUserContext() {
  return useContext(UserContext);
}

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(initialValue);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decoded = jwt_decode(localStorage.getItem('token') as string) as User;
      setUser(decoded);
      setUserLoading(false);
      return;
    }
    localStorage.setItem('token', '');
    setUser(initialValue);
    setUserLoading(false);
  }, []);

  return <UserContext.Provider value={{ user, userLoading }}>{children}</UserContext.Provider>;
}

export { useUserContext, UserContextProvider };
