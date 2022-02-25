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
import { useMediaQueries, useBreakPoints } from 'utils/responsive';

const { md } = useMediaQueries();

export default function LoginForm() {
	const router = useRouting();
	const { updateToken } = useUserContext();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const { isMediumScreen } = useBreakPoints();
	const { color, font } = useTheme();
	const { styles, ids } = styleSheet(color, font);

	const handleOnSubmit = async () => {
		setLoading(true);
		const userData = await login(username, password);
		if (!userData) {
			setLoading(false);
			setErrorMessage('Could not find account');
			setPassword('');
			setTimeout(() => {
				setErrorMessage('');
			}, 3000);
			return;
		}
		updateToken(userData.token);
		router.navigate({ routeName: '' });
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
					textContentType={'password'}
					secureTextEntry
					dataSet={{ media: ids.textInput }}
					editable={!loading}
				/>
			</View>
			<Button
				text={errorMessage || 'Login'}
				disabled={!username || !password || errorMessage !== ''}
				onClick={handleOnSubmit}
				width={isMediumScreen ? 300 : 250}
				loading={loading}
			/>
			<View style={styles.divider} />
			<Button
				text={'Register'}
				disabled={false}
				onClick={redirectToRegisterPage}
				width={isMediumScreen ? 300 : 250}
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
			color: color.text,
			height: 50,
			width: 250,

			[md]: {
				width: 300,
			},
		},

		error: {
			borderColor: color.error,
			borderWidth: 1,
		},

		divider: {
			height: 15,
		},
	});
