import React from 'react';
import { useTheme } from 'react-native-paper';
import { Color, Font } from 'types';
import { Text, View, Pressable } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useRouter } from 'next/router';
import { useUserContext } from '../context/UserContext';

export default function NavBar() {
	const router = useRouter();
	const { loggedIn, user, logout, userLoading } = useUserContext();

	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	const handleLogout = () => {
		logout();
		router.push('/');
	};

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
				<Text style={styles.text}>{'Home'}</Text>
			</Pressable>
			<View style={styles.navContainer}>
				{userLoading && <Text style={styles.text}>{'Loading...'}</Text>}
				{!userLoading && loggedIn && (
					<>
						<Text style={styles.text}>{user.name}</Text>
						<View style={styles.separator} />
						<Pressable onPress={handleLogout}>
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
			backgroundColor: `${color.secondary}`,
			height: 45,
			width: '100%',
			padding: 20,
		},

		navContainer: {
			flexDirection: 'row',
		},

		separator: {
			width: 20,
		},

		text: {
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			color: color.text,
			textAlign: 'center',
		},
	});
