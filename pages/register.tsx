import type { NextPage } from 'next';
import React from 'react';
import Register from 'src/Register';
import { useUserContext } from 'src/common/context/UserContext';
import { useRouter } from 'next/router';
import Loading from 'src/common/Loading';

const RegisterPage: NextPage = () => {
	const { loggedIn } = useUserContext();
	const router = useRouter();

	if (loggedIn) {
		router.push('/');
		return <Loading />;
	}

	return <Register />;
};

export default RegisterPage;
