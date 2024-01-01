import type { NextPage } from 'next';
import React from 'react';
import { getPublicRooms } from 'server/routers';
import Layout from 'src/common/Layout';
import Home from 'src/Home';
import { Room } from 'types';

interface HomePageProps {
	rooms: Room[];
}

const HomePage: NextPage<HomePageProps> = props => {
	return (
		<Layout scrollView>
			<Home rooms={props.rooms} />
		</Layout>
	);
};

export async function getStaticProps() {
	const rooms = await getPublicRooms();
	return {
		props: {
			rooms: rooms || [],
		},
		revalidate: 10, // every 10 seconds
	};
}

// test

export default HomePage;
