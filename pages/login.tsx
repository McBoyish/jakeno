import type { NextPage } from 'next';
import React from 'react';
import Login from 'src/Login';
import { useUserContext } from 'src/common/context/UserContext';
import { useRouter } from 'next/router';
import Loading from 'src/common/Loading';
import Layout from 'src/common/Layout';

const LoginPage: NextPage = () => {
	const { loggedIn } = useUserContext();
	const router = useRouter();

	if (loggedIn) {
		router.push('/');
		return (
			<Layout>
				<Loading />
			</Layout>
		);
	}

	return (
		<Layout>
			<Login />
		</Layout>
	);
};

export default LoginPage;
