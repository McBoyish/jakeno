import { GetServerSideProps } from 'next';
import React from 'react';
import Room from '../../src/Room';
import { RoomData } from 'types';
import { getRoom, isLocked } from 'server/routers';
import { sortByDate } from 'utils/date';

interface RoomPageProps {
	roomData: RoomData | null;
	invalidCode?: boolean;
	unknownError?: boolean;
}

export default function RoomPage({
	roomData,
	invalidCode,
	unknownError,
}: RoomPageProps) {
	return (
		<Room
			initialRoomData={roomData}
			invalidCode={invalidCode}
			unknownError={unknownError}
		/>
	);
}

export const getServerSideProps: GetServerSideProps = async context => {
	try {
		const roomName = context.query.roomName;
		const code = context.query.code;

		const res = await isLocked((roomName || '') as string);

		const roomData = await getRoom(
			(roomName || '') as string,
			code as string | undefined
		);

		if (!res || !roomData)
			return {
				props: {
					roomData: null,
				},
			};

		roomData.messages = sortByDate(roomData.messages);

		return {
			props: {
				roomData,
			},
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		if (e.response && e.response.data?.message === 'invalid-room-code') {
			return {
				props: {
					roomData: null,
					invalidCode: true,
				},
			};
		}
		return {
			props: {
				roomData: null,
				unknownError: true,
			},
		};
	}
};
