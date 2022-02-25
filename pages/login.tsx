import type { NextPage } from 'next';
import React from 'react';
import Login from 'src/Login';
import { useUserContext } from 'src/common/context/UserContext';
import { useRouting } from 'expo-next-react-navigation';
import Loading from 'src/common/Loading';

const LoginPage: NextPage = () => {
	const { loggedIn } = useUserContext();
	const { navigate } = useRouting();

	if (loggedIn) {
		navigate({ routeName: '' });
		return <Loading />;
	}

	return <Login />;
};

export default LoginPage;
