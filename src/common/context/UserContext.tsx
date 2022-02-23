/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Color, User } from 'types';
import jwt_decode from 'jwt-decode';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import StyleSheet from 'react-native-media-query';

interface UserContextData {
	user: User;
	userLoading: boolean;
	loggedIn: boolean;
}

const initialValue: User = { name: '', _id: '' };

const UserContext = createContext<UserContextData>({
	user: initialValue,
	userLoading: true,
	loggedIn: false,
});

function useUserContext() {
	return useContext(UserContext);
}

function UserContextProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User>(initialValue);
	const [userLoading, setUserLoading] = useState<boolean>(true);
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const { color } = useTheme();
	const { styles } = styleSheet(color);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decoded = jwt_decode(token) as User;
			setUser(decoded);
			setUserLoading(false);
			setLoggedIn(true);
			return;
		}
		localStorage.setItem('token', '');
		setUser(initialValue);
		setUserLoading(false);
		setLoggedIn(false);
	}, []);

	if (userLoading)
		return <ActivityIndicator style={styles.container} color={color.primary} />;

	return (
		<UserContext.Provider value={{ user, userLoading, loggedIn }}>
			{children}
		</UserContext.Provider>
	);
}

export { useUserContext, UserContextProvider };

const styleSheet = (color: Color) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: color.background,
			padding: 20,
		},
	});
