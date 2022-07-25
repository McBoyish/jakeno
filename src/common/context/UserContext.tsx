/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'types';
import { uri, io } from 'server/socket';
import { verify } from 'server/routers';
import { Socket } from 'socket.io-client';

interface UserContextData {
	user: User;
	userLoading: boolean;
	loggedIn: boolean;
	token: string;
	updateToken: (_: string) => void;
	logoff: () => void;
	socket: Socket;
}

const initialValue: User = { name: 'anon', _id: 'anon' };
const socket = io(uri);

const UserContext = createContext<UserContextData>({
	user: initialValue,
	userLoading: true,
	loggedIn: false,
	token: '',
	updateToken: () => null,
	logoff: () => null,
	socket,
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
				logoff();
				return;
			}

			const user = await verify(token);
			if (user) {
				updateStates(token, user);
			} else {
				logoff();
			}
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
			value={{
				user,
				userLoading,
				loggedIn,
				token,
				updateToken,
				logoff,
				socket,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export { useUserContext, UserContextProvider };
