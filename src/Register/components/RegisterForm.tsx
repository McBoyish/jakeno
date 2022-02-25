import React from 'react';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { Text, TextInput, View } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useUserContext } from 'src/common/context/UserContext';
import { useRouting } from 'expo-next-react-navigation';
import { register } from 'server/routers';
import { useMediaQueries } from 'utils/responsive';

const { md } = useMediaQueries();

export default function RegisterForm() {
	const router = useRouting();
	const { updateToken } = useUserContext();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [isValidUsername, setIsValidUsername] = useState(true);
	const [isValidPassword, setIsValidPassword] = useState(true);
	const [isValidConfirm, setIsValidConfirm] = useState(true);
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const { color, font } = useTheme();
	const { styles, ids } = styleSheet(color, font);

	const handleOnSubmit = async () => {
		setLoading(true);
		const usernameValid = /^[a-zA-Z0-9]{3,12}$/.test(username);
		const passwordValid = /^[a-zA-Z0-9]{8,20}$/.test(password);
		const confirmValid = confirm === password;
		setIsValidUsername(usernameValid);
		setIsValidPassword(passwordValid);
		setIsValidConfirm(confirmValid);
		if (!usernameValid || !passwordValid || !confirmValid) {
			setLoading(false);
			return;
		}
		const userData = await register(username, password);
		if (!userData) {
			setLoading(false);
			setErrorMsg('Account already exists');
			setPassword('');
			setConfirm('');
			setTimeout(() => {
				setErrorMsg('');
			}, 3000);
			return;
		}
		updateToken(userData.token);
		router.navigate({ routeName: '' });
	};

	return (
		<View style={styles.container}>
			<View style={styles.headingContainer}>
				<Text style={styles.heading}>{'Create a new account'}</Text>
			</View>
			<View style={styles.formContainer}>
				<View style={styles.inputContainer}>
					<TextInput
						onChangeText={setUsername}
						value={username}
						style={[
							styles.textInput,
							!isValidUsername ? styles.error : undefined,
						]}
						placeholder={'Enter username'}
						dataSet={{ media: ids.textInput }}
						editable={!loading}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						onChangeText={setPassword}
						value={password}
						style={[
							styles.textInput,
							!isValidPassword ? styles.error : undefined,
						]}
						placeholder={'Enter password'}
						textContentType={'password'}
						secureTextEntry
						dataSet={{ media: ids.textInput }}
						editable={!loading}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						onChangeText={setConfirm}
						value={confirm}
						style={[
							styles.textInput,
							!isValidConfirm ? styles.error : undefined,
						]}
						placeholder={'Confirm password'}
						textContentType={'password'}
						secureTextEntry
						dataSet={{ media: ids.textInput }}
						editable={!loading}
					/>
				</View>
				<Button
					text={errorMsg || 'Register'}
					disabled={!username || !password || !confirm || errorMsg !== ''}
					onClick={handleOnSubmit}
					loading={loading}
					dataSet={{ media: ids.button }}
					style={styles.button}
				/>
				<View
					style={styles.formHelperContainer}
					dataSet={{ media: ids.formHelperContainer }}
				>
					<Text style={styles.formHelperText}>
						{'Username can be 3 to 12 numbers or letters'}
					</Text>
					<Text style={styles.formHelperText}>
						{'Password can be 8 to 20 numbers or letters'}
					</Text>
				</View>
			</View>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			marginVertical: 5,
		},

		formContainer: {
			marginVertical: 5,
			padding: 20,
			backgroundColor: color.secondary,
			borderRadius: 5,
			alignItems: 'center',
		},

		headingContainer: {
			marginBottom: 15,
		},

		inputContainer: {
			marginBottom: 15,
		},

		heading: {
			fontSize: font.size.heading,
			fontFamily: font.family.heading,
			color: color.text,
			textAlign: 'center',
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

		button: {
			width: 250,

			[md]: {
				width: 300,
			},
		},

		error: {
			borderColor: color.error,
			borderWidth: 1,
		},

		formHelperText: {
			fontSize: font.size.tertiary,
			fontFamily: font.family.text,
			color: color.text,
			textAlign: 'center',
			alignSelf: 'center',
			paddingHorizontal: 10,
			lineHeight: 15,
		},

		formHelperContainer: {
			marginTop: 15,
			width: 250,

			[md]: {
				width: 300,
			},
		},
	});