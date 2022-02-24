import React from 'react';
import { useTheme } from 'react-native-paper';
import { Color, Font } from 'types';
import { Text, View, Pressable } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useRouting } from 'expo-next-react-navigation';
import { useUserContext } from '../context/UserContext';

export default function NavBar() {
	const router = useRouting();
	const { loggedIn, user } = useUserContext();
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	const redirectToHomePage = () => {
		router.navigate({ routeName: '' });
	};

	const logoff = () => {
		// logoff
	};

	return (
		<View style={styles.container}>
			<Pressable style={styles.leftContainer} onPress={redirectToHomePage}>
				<Text style={styles.heading}>{'RS'}</Text>
			</Pressable>
			<View style={styles.rightContainer}>
				{loggedIn && <Text style={styles.text}>{user.name}</Text>}
				{!loggedIn && (
					<Pressable>
						<Text style={styles.text}>{'Not logged in'}</Text>
					</Pressable>
				)}
			</View>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignSelf: 'center',
			alignItems: 'center',
			justifyContent: 'space-between',
			backgroundColor: color.tertiary,
			height: 60,
			width: '100%',
			padding: 20,
		},

		leftContainer: {
			padding: 5,
			borderRadius: 10,
		},

		rightContainer: {
			flexDirection: 'row',
			padding: 5,
			borderRadius: 10,
		},

		separator: {
			width: 10,
		},

		heading: {
			fontSize: font.size.heading,
			fontFamily: font.family.heading,
			color: color.text,
			textAlign: 'center',
		},

		text: {
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			color: color.text,
			textAlign: 'center',
		},
	});
