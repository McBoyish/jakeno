import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import StyleSheet from 'react-native-media-query';
import { Color, Font, LiveRoom } from 'types';
import { useRouter } from 'next/router';
import { useBreakPoints } from 'utils/responsive';

interface LiveRoomsProps {
	liveRooms: LiveRoom[];
}

export default function LiveRooms({ liveRooms }: LiveRoomsProps) {
	const router = useRouter();

	const { isSmallScreen, isMediumScreen } = useBreakPoints();
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font, isSmallScreen, isMediumScreen);

	const renderItem = (liveRoom: LiveRoom, last: boolean) => {
		return (
			<TouchableOpacity
				style={[styles.cardContainer, { marginBottom: last ? 0 : 20 }]}
				onPress={() => router.push(`/room/${liveRoom.name}`)}
				key={liveRoom._id}
			>
				<View style={styles.cardHeaderContainer}>
					<Text style={styles.header}>{liveRoom.name}</Text>
					<Text style={styles.smallText}>
						{`Users: ${liveRoom.activeUsers}`}
					</Text>
				</View>
				<Text style={styles.text} numberOfLines={5}>
					{liveRoom.description}
				</Text>
				<Text style={styles.text} numberOfLines={5}>
					{`Created by: ${liveRoom.user.name}`}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View>
			<Text style={styles.heading}>{'Press a room to join'}</Text>
			<View style={styles.container}>
				<ScrollView
					style={styles.listContainer}
					contentContainerStyle={styles.content}
					showsVerticalScrollIndicator={false}
				>
					{liveRooms &&
						liveRooms.map((liveRoom, index) => {
							return renderItem(liveRoom, index === liveRooms.length - 1);
						})}
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
			padding: 20,
			borderRadius: 5,
			backgroundColor: color.primary,
			alignSelf: 'center',
		},

		listContainer: {
			width: isMediumScreen ? 350 : isSmallScreen ? 300 : '100%',
			height: 395,
		},

		content: {
			flexWrap: 'wrap',
			flexDirection: 'row',
			justifyContent: 'center',
		},

		heading: {
			fontSize: font.size.heading,
			fontFamily: font.family.heading,
			color: color.text,
			textAlign: 'center',
			marginBottom: 15,
		},

		cardContainer: {
			width: '100%',
			height: isMediumScreen ? 300 : isSmallScreen ? 250 : 200,
			backgroundColor: color.secondary,
			borderRadius: 5,
			padding: 10,
		},

		header: {
			fontSize: font.size.heading,
			fontFamily: font.family.heading,
			color: color.text,
			lineHeight: 28,
		},

		text: {
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			color: color.text,
		},

		smallText: {
			fontSize: font.size.secondary,
			fontFamily: font.family.text,
			color: color.text,
		},

		cardHeaderContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-start',
			marginBottom: 20,
		},
	});
