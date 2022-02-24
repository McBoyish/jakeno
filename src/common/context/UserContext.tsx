/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'types';
import jwt_decode from 'jwt-decode';

interface UserContextData {
	user: User;
	userLoading: boolean;
	loggedIn: boolean;
	updateToken: (_: string) => void;
}

const initialValue: User = { name: '', _id: '' };

const UserContext = createContext<UserContextData>({
	user: initialValue,
	userLoading: true,
	loggedIn: false,
	updateToken: () => null,
});

function useUserContext() {
	return useContext(UserContext);
}

function UserContextProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User>(initialValue);
	const [userLoading, setUserLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [token, setToken] = useState('');

	useEffect(() => {
		// retrieve token on page load
		const localToken = localStorage.getItem('token');
		if (localToken) {
			const user = jwt_decode(localToken) as User;
			setUser(user);
			setLoggedIn(true);
			setToken(localToken);
		} else localStorage.setItem('token', '');
		setUserLoading(false);
	}, []);

	const updateToken = (new_token: string) => {
		if (token === new_token) return;
		if (new_token) {
			localStorage.setItem('token', new_token);
			const user = jwt_decode(new_token) as User;
			setUser(user);
			userLoading && setUserLoading(false);
			!loggedIn && setLoggedIn(true);
			setToken(new_token);
		}
	};

	return (
		<UserContext.Provider value={{ user, userLoading, loggedIn, updateToken }}>
			{children}
		</UserContext.Provider>
	);
}

export { useUserContext, UserContextProvider };
