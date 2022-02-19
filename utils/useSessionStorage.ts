import { useEffect } from 'react';
import { User } from 'types';

interface UpdateUserInput {
  _id?: string;
  name?: string;
}

export default function useSessionStorage() {
  const isServer = typeof window === 'undefined';
  const initialUser: User = { _id: '', name: '' };

  useEffect(() => {
    if (sessionStorage.getItem('user')) return;
    sessionStorage.setItem('user', JSON.stringify(initialUser));
  }, []);

  const updateUser = (updatedUser: UpdateUserInput) => {
    if (isServer) return;
    const user = JSON.parse(
      sessionStorage.getItem('user') || JSON.stringify(initialUser)
    );
    sessionStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser }));
  };

  const getUser = () => {
    if (isServer) return initialUser;
    const user: User = JSON.parse(
      sessionStorage.getItem('user') || JSON.stringify(initialUser)
    );
    return user;
  };

  return { getUser, updateUser };
}
