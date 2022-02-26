import { GetServerSideProps } from 'next';
import React from 'react';
import Room from '../../src/Room';
import { RoomData } from 'types';
import { getRoom } from 'server/routers';
import { sortByDate } from 'utils/date';

interface RoomPageProps {
	roomData: RoomData | null;
}

export default function RoomPage({ roomData }: RoomPageProps) {
	return <Room initialRoomData={roomData} />;
}

export const getServerSideProps: GetServerSideProps = async context => {
	const roomName = context.params?.roomName;
	if (!roomName)
		return {
			props: {
				roomData: null,
			},
		};
	const roomData = await getRoom(roomName as string);
	if (!roomData)
		return {
			props: {
				roomData: null,
			},
		};
	roomData.messages = sortByDate(roomData.messages);
	return {
		props: {
			roomData: roomData,
		},
	};
};
