import React from 'react';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { Text, TextInput, View } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useUserContext } from 'src/common/context/UserContext';
import { useRouter } from 'next/router';
import { register } from 'server/routers';
import { useBreakPoints, useMediaQueries } from 'utils/responsive';

const { md } = useMediaQueries();

export default function RegisterForm() {
	const router = useRouter();
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
	const { isMediumScreen } = useBreakPoints();
	const { styles, ids } = styleSheet(color, font, isMediumScreen);

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
		router.push('/');
	};

	return (
		<View>
			<Text style={styles.heading}>{'Create an account'}</Text>
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
					containerStyle={styles.button}
				/>
				<View
					style={styles.formHelperContainer}
					dataSet={{ media: ids.formHelperContainer }}
				>
					<Text
						style={styles.formHelperText}
						dataSet={{ media: ids.formHelperText }}
					>
						{'Username should be 3-12 numbers/letters'}
					</Text>
					<Text
						style={styles.formHelperText}
						dataSet={{ media: ids.formHelperText }}
					>
						{'Password should be 8-20 numbers/letters'}
					</Text>
				</View>
			</View>
		</View>
	);
}

const styleSheet = (color: Color, font: Font, isMediumScreen: boolean) =>
	StyleSheet.create({
		formContainer: {
			padding: 20,
			backgroundColor: color.secondary,
			borderRadius: 5,
			alignItems: 'center',
		},

		inputContainer: {
			marginBottom: 15,
		},

		heading: {
			fontSize: font.size.heading,
			fontFamily: font.family.heading,
			color: color.text,
			textAlign: 'center',
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

		formHelperText: {
			fontSize: font.size.small,
			fontFamily: font.family.text,
			color: color.primary,
			opacity: 0.5,
			textAlign: 'center',
			alignSelf: 'center',
			paddingHorizontal: 10,
			marginVertical: 1,

			[md]: {
				fontSize: font.size.secondary,
			},
		},

		formHelperContainer: {
			marginTop: 15,
			width: 225,

			[md]: {
				width: 300,
			},
		},
	});
