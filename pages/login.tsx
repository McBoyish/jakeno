import type { NextPage } from 'next';
import React from 'react';
import Login from 'src/Login';
import { useUserContext } from 'src/common/context/UserContext';
import { useRouter } from 'next/router';
import Loading from 'src/common/Loading';

const LoginPage: NextPage = () => {
	const { loggedIn } = useUserContext();
	const router = useRouter();

	if (loggedIn) {
		router.push('/');
		return <Loading />;
	}

	return <Login />;
};

export default LoginPage;
