import type { NextPage } from 'next';
import React from 'react';
import Register from 'src/Register';
import { useUserContext } from 'src/common/context/UserContext';
import { useRouter } from 'next/router';
import Loading from 'src/common/Loading';
import Layout from 'src/common/Layout';

const RegisterPage: NextPage = () => {
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
			<Register />;
		</Layout>
	);
};

export default RegisterPage;
