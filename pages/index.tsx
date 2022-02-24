import type { NextPage } from 'next';
import React from 'react';
import Login from 'src/Login';
import Lobby from 'src/Lobby';
import { useUserContext } from 'src/common/context/UserContext';

const HomePage: NextPage = () => {
	const { loggedIn } = useUserContext();

	return loggedIn ? <Lobby /> : <Login />;
};

export default HomePage;
