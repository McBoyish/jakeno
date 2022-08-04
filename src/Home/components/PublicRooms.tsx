import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Room } from 'types';

interface PublicRoomsProps {
	rooms: Room[];
}

export default function PublicRooms({ rooms }: PublicRoomsProps) {
	const renderItem = ({ item }: { item: Room }) => {
		return (
			<View>
				<Text>{item.name}</Text>
				<Text>{item.description}</Text>
			</View>
		);
	};

	return (
		<View>
			<FlatList
				data={rooms}
				keyExtractor={room => room._id}
				renderItem={renderItem}
			/>
		</View>
	);
}
