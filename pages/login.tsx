import type { NextPage } from 'next';
import React from 'react';
import Login from 'src/Login';
import { useUserContext } from 'src/common/context/UserContext';
import { useRouting } from 'expo-next-react-navigation';
import Blank from 'src/common/Blank';

const LoginPage: NextPage = () => {
	const { loggedIn } = useUserContext();
	const { navigate } = useRouting();

	if (loggedIn) {
		navigate({ routeName: '' });
		return <Blank />;
	}

	return <Login />;
};

export default LoginPage;
