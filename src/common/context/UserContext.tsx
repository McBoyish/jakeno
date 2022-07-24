/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'types';
import { verify } from 'server/routers';

interface UserContextData {
	user: User;
	userLoading: boolean;
	loggedIn: boolean;
	token: string;
	updateToken: (_: string) => void;
	logoff: () => void;
}

const initialValue: User = { name: 'anon', _id: 'anon' };

const UserContext = createContext<UserContextData>({
	user: initialValue,
	userLoading: true,
	loggedIn: false,
	token: '',
	updateToken: () => null,
	logoff: () => null,
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
		// retrieve and verify token on page load
		const verifyToken = async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				localStorage.removeItem('token');
				setUserLoading(false);
				return;
			}

			const user = await verify(token);
			if (user) {
				updateStates(token, user);
				return;
			}

			logoff();
		};
		verifyToken();
	}, []);

	const updateToken = async (token: string) => {
		const user = await verify(token);
		if (user) {
			// update token if it is valid
			localStorage.setItem('token', token);
			updateStates(token, user);
		}
	};

	const logoff = () => {
		localStorage.removeItem('token');
		clearStates();
	};

	const updateStates = (token: string, user: User) => {
		setToken(token);
		setUser(user);
		setLoggedIn(true);
		setUserLoading(false);
	};

	const clearStates = () => {
		setToken('');
		setUser(initialValue);
		setLoggedIn(false);
		setUserLoading(false);
	};

	return (
		<UserContext.Provider
			value={{ user, userLoading, loggedIn, token, updateToken, logoff }}
		>
			{children}
		</UserContext.Provider>
	);
}

export { useUserContext, UserContextProvider };
