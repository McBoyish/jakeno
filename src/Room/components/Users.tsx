import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { User } from 'types';
import { Color, Font } from 'types';
import StyleSheet from 'react-native-media-query';

interface UsersProps {
	users: User[];
	usersVisible: boolean;
	setUsersVisible: (_: boolean) => void;
}

export default function Users({ users, usersVisible }: UsersProps) {
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	return (
		<View style={styles.container}>
			{!usersVisible && (
				<Text style={styles.text}>
					{`${users.length} user${users.length > 1 ? 's' : ''}`}
				</Text>
			)}
			{usersVisible && (
				<View>
					{users.map((user, index) => {
						return (
							<Text style={styles.text} key={`${user.name}${index}`}>
								{user.name}
							</Text>
						);
					})}
				</View>
			)}
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			position: 'absolute',
			zIndex: 1,
			borderRadius: 5,
			top: 0,
			right: 20,
		},

		text: {
			fontSize: font.size.secondary,
			fontFamily: font.family.text,
			color: color.primary,
			lineHeight: 20,
		},
	});
