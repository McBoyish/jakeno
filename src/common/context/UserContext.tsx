/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'types';
import { verify } from 'server/routers';
import Loading from '../Loading';

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
		let isMounted = true;
		const verifyToken = async () => {
			const token = localStorage.getItem('token');
			console.log('fetching');
			const user = await verify(token);
			console.log('done fetching');
			if (isMounted && token && user) {
				setUser(user);
				setLoggedIn(true);
				setToken(token);
				setUserLoading(false);
				console.log('done loading user');
				return;
			}
			if (isMounted && token && !user) {
				logoff();
				return;
			}
			if (isMounted && !token) {
				localStorage.setItem('token', '');
				setUserLoading(false);
				return;
			}
		};
		console.log('useeffect fired');
		verifyToken();
		return () => {
			isMounted = false;
		};
	}, []);

	const updateToken = async (token: string) => {
		const user = await verify(token);
		if (user) {
			// update token if it is valid
			localStorage.setItem('token', token);
			setToken(token);
			setUser(user);
			!loggedIn && setLoggedIn(true);
			userLoading && setUserLoading(false);
		}
	};

	const logoff = () => {
		localStorage.setItem('token', '');
		setToken('');
		setUser(initialValue);
		loggedIn && setLoggedIn(false);
		userLoading && setUserLoading(false);
	};

	if (userLoading) return <Loading />;

	return (
		<UserContext.Provider
			value={{ user, userLoading, loggedIn, token, updateToken, logoff }}
		>
			{children}
		</UserContext.Provider>
	);
}

export { useUserContext, UserContextProvider };
