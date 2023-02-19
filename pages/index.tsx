import type { NextPage } from 'next';
import React from 'react';
import { getPublicRooms } from 'server/routers';
import Home from 'src/Home';
import { Room } from 'types';

interface HomePageProps {
	rooms: Room[];
}

const HomePage: NextPage<HomePageProps> = props => {
	return <Home rooms={props.rooms} />;
};

export async function getStaticProps() {
	const rooms = await getPublicRooms();
	return {
		props: {
			rooms: rooms || [],
		},
		revalidate: 60 * 60 * 24 * 7, // every week
	};
}

export default HomePage;
