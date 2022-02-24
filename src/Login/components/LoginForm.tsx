import React from 'react';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { TextInput, View } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useUserContext } from 'src/common/context/UserContext';
import { useRouting } from 'expo-next-react-navigation';
import { login } from 'server/routers';

export default function LoginForm() {
	const router = useRouting();
	const { updateToken } = useUserContext();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	const handleOnSubmit = async () => {
		const userData = await login(username, password);
		if (!userData) {
			setErrorMessage('Could not find account');
			setPassword('');
			setTimeout(() => {
				setErrorMessage('');
			}, 3000);
			return;
		}
		updateToken(userData.token);
		router.navigate({ routeName: 'lobby' });
	};

	const redirectToRegisterPage = () => {
		router.navigate({ routeName: 'register' });
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					onChangeText={setUsername}
					value={username}
					style={[styles.textInput, errorMessage ? styles.error : null]}
					placeholder={'Username'}
				/>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					onChangeText={setPassword}
					value={password}
					style={styles.textInput}
					placeholder={'Password'}
					textContentType={'password'}
					secureTextEntry
				/>
			</View>
			<Button
				text={errorMessage || 'Login'}
				disabled={!username || !password || errorMessage !== ''}
				onClick={handleOnSubmit}
				width={225}
			/>
			<View style={styles.divider} />
			<Button
				text={'Register'}
				disabled={false}
				onClick={redirectToRegisterPage}
				width={225}
			/>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			padding: 20,
			backgroundColor: color.secondary,
			borderRadius: 5,
			alignItems: 'center',
		},

		inputContainer: {
			marginBottom: 15,
		},

		textInput: {
			borderRadius: 5,
			paddingHorizontal: 10,
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			outlineStyle: 'none',
			borderColor: color.primary,
			backgroundColor: color.tertiary,
			height: 50,
			width: 225,
		},

		error: {
			borderColor: color.error,
			borderWidth: 1,
		},

		divider: {
			height: 15,
		},
	});
