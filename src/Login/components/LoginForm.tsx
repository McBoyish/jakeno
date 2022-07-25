import React from 'react';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { TextInput, View } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useUserContext } from 'src/common/context/UserContext';
import { useRouter } from 'next/router';
import { login } from 'server/routers';
import { useBreakPoints } from 'utils/responsive';

export default function LoginForm() {
	const router = useRouter();
	const { updateToken } = useUserContext();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const { color, font } = useTheme();
	const { isMediumScreen } = useBreakPoints();
	const { styles, ids } = styleSheet(color, font, isMediumScreen);

	const handleOnSubmit = async () => {
		setLoading(true);

		const userData = await login(username, password);
		if (!userData) {
			setLoading(false);
			setErrorMessage('Invalid name or password');
			setPassword('');
			setTimeout(() => {
				setErrorMessage('');
			}, 3000);
			return;
		}

		updateToken(userData.token);
		router.push('/');
	};

	const redirectToRegisterPage = () => {
		router.push('/register');
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					onChangeText={setUsername}
					value={username}
					style={[styles.textInput, errorMessage ? styles.error : undefined]}
					placeholder={'Username'}
					dataSet={{ media: ids.textInput }}
					editable={!loading}
				/>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					onChangeText={setPassword}
					value={password}
					style={[styles.textInput, errorMessage ? styles.error : undefined]}
					placeholder={'Password'}
					secureTextEntry
					dataSet={{ media: ids.textInput }}
					editable={!loading}
				/>
			</View>
			<Button
				text={errorMessage || 'Login'}
				disabled={!username || !password || errorMessage !== ''}
				onClick={handleOnSubmit}
				loading={loading}
				containerStyle={styles.button}
			/>
			<View style={styles.divider} />
			<Button
				text={'Register'}
				disabled={false}
				onClick={redirectToRegisterPage}
				containerStyle={styles.button}
			/>
		</View>
	);
}

const styleSheet = (color: Color, font: Font, isMediumScreen: boolean) =>
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
			backgroundColor: color.background,
			color: color.text,
			height: 50,
			width: isMediumScreen ? 300 : 225,
		},

		button: {
			width: isMediumScreen ? 300 : 225,
		},

		error: {
			borderColor: color.error,
			borderWidth: 1,
		},

		divider: {
			height: 15,
		},
	});
