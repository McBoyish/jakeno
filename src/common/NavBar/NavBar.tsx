import React from 'react';
import { useTheme } from 'react-native-paper';
import { Color, Font } from 'types';
import { Text, View, Pressable } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useRouter } from 'next/router';
import { useUserContext } from '../context/UserContext';
import ImageComponent from 'next/image';

export default function NavBar() {
	const router = useRouter();
	const { loggedIn, user, logoff, userLoading } = useUserContext();
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	const redirectToHomePage = () => {
		router.push('/');
	};

	const redirectToLoginPage = () => {
		router.push('/login');
	};

	const redirectToRegisterPage = () => {
		router.push('/register');
	};

	return (
		<View style={styles.container}>
			<Pressable style={styles.navContainer} onPress={redirectToHomePage}>
				<ImageComponent src='/ufo.png' width={60} height={40} />
			</Pressable>
			<View style={styles.navContainer}>
				{userLoading && <Text style={styles.text}>{'Loading...'}</Text>}
				{!userLoading && loggedIn && (
					<>
						<Text style={styles.text}>{user.name}</Text>
						<View style={styles.separator} />
						<Pressable onPress={logoff}>
							<Text style={styles.text}>{'Log out'}</Text>
						</Pressable>
					</>
				)}
				{!userLoading && !loggedIn && (
					<>
						<Pressable onPress={redirectToLoginPage}>
							<Text style={styles.text}>{'Log in'}</Text>
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

		navContainer: {
			flexDirection: 'row',
			padding: 5,
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
