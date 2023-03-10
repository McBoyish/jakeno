import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import StyleSheet from 'react-native-media-query';
import { Color, Font, Room } from 'types';
import { useRouter } from 'next/router';
import { container } from 'src/common/css';
import { useBreakPoints } from 'utils/responsive';

interface AllRoomsProps {
	rooms: Room[];
}

export default function AllRooms({ rooms }: AllRoomsProps) {
	const router = useRouter();

	const { isSmallScreen, isMediumScreen } = useBreakPoints();
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font, isSmallScreen, isMediumScreen);

	const renderItem = (room: Room, last: boolean) => {
		return (
			<TouchableOpacity
				style={[styles.cardContainer, { marginBottom: last ? 0 : 20 }]}
				onPress={() => router.push(`/room/${room.name}`)}
				key={room._id}
			>
				<View>
					<View style={styles.cardHeaderContainer}>
						<Text style={styles.header}>{room.name}</Text>
					</View>
					<Text style={styles.text} numberOfLines={2}>
						{room.description}
					</Text>
				</View>
				<Text style={[styles.smallText, { alignSelf: 'flex-end' }]}>
					{`Created by: ${room.user.name}`}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View>
			<Text style={styles.heading}>{'All rooms'}</Text>
			<View style={styles.container}>
				<ScrollView
					style={styles.listContainer}
					contentContainerStyle={styles.content}
					showsVerticalScrollIndicator={false}
				>
					{rooms.length > 0 &&
						rooms.map((room, index) => {
							return renderItem(room, index === rooms.length - 1);
						})}
					{rooms.length === 0 && (
						<Text style={styles.cardText}>{'No rooms available'}</Text>
					)}
				</ScrollView>
			</View>
		</View>
	);
}

const styleSheet = (
	color: Color,
	font: Font,
	isSmallScreen: boolean,
	isMediumScreen: boolean
) =>
	StyleSheet.create({
		container: {
			...container,
			alignSelf: 'center',
		},

		listContainer: {
			width: isMediumScreen ? 350 : isSmallScreen ? 300 : 225,
			height: 600,
		},

		content: {
			flexWrap: 'wrap',
			flexDirection: 'row',
			justifyContent: 'center',
			padding: 20,
		},

		heading: {
			fontSize: font.size.heading,
			fontFamily: font.family.heading,
			color: color.text,
			textAlign: 'center',
			marginBottom: 15,
		},

		cardContainer: {
			backgroundColor: color.secondary,
			padding: 10,
			width: '100%',
			minHeight: isMediumScreen ? 200 : isSmallScreen ? 150 : 100,
			justifyContent: 'space-between',
		},

		cardText: {
			minHeight: isMediumScreen ? 200 : isSmallScreen ? 150 : 100,
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			color: color.text,
		},

		header: {
			fontSize: font.size.subheading,
			fontFamily: font.family.text,
			color: color.text,
			lineHeight: 20,
		},

		text: {
			fontSize: font.size.secondary,
			fontFamily: font.family.text,
			color: color.text,
		},

		smallText: {
			fontSize: font.size.small,
			fontFamily: font.family.text,
			color: color.text,
		},

		cardHeaderContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-start',
			marginBottom: 5,
		},
	});
