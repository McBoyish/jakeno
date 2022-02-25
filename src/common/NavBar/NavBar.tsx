import React from 'react';
import { useTheme } from 'react-native-paper';
import { Color, Font } from 'types';
import { Text, View, Pressable, Image } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useRouting } from 'expo-next-react-navigation';
import { useUserContext } from '../context/UserContext';

export default function NavBar() {
	const router = useRouting();
	const { loggedIn, user, logoff } = useUserContext();
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	const redirectToHomePage = () => {
		router.navigate({ routeName: '' });
	};

	const redirectToLoginPage = () => {
		router.navigate({ routeName: 'login' });
	};

	const redirectToRegisterPage = () => {
		router.navigate({ routeName: 'register' });
	};

	return (
		<View style={styles.container}>
			<Pressable style={styles.leftContainer} onPress={redirectToHomePage}>
				<img src={'/ufo.png'} />
			</Pressable>
			<View style={styles.rightContainer}>
				{loggedIn && (
					<>
						<Text style={styles.text}>{user.name}</Text>
						<View style={styles.separator} />
						<Pressable onPress={logoff}>
							<Text style={styles.text}>{'Logout'}</Text>
						</Pressable>
					</>
				)}
				{!loggedIn && (
					<>
						<Pressable onPress={redirectToLoginPage}>
							<Text style={styles.text}>{'Login'}</Text>
						</Pressable>
						<View style={styles.separator} />
						<Pressable onPress={redirectToRegisterPage}>
							<Text style={styles.text}>{'Register'}</Text>
						</Pressable>
					</>
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
			flexDirection: 'row',
			alignItems: 'center',
			padding: 5,
			borderRadius: 10,
		},

		rightContainer: {
			flexDirection: 'row',
			padding: 5,
			borderRadius: 10,
		},

		separator: {
			width: 20,
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
