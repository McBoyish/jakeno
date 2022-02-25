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

export default function RegisterForm() {
	const router = useRouting();
	const { updateToken } = useUserContext();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [isValidUsername, setIsValidUsername] = useState(true);
	const [isValidPassword, setIsValidPassword] = useState(true);
	const [isValidConfirm, setIsValidConfirm] = useState(true);
	const [errorMsg, setErrorMsg] = useState('');
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	const handleOnSubmit = async () => {
		const usernameValid = /^[a-zA-Z0-9]{3,12}$/.test(username);
		const passwordValid = /^[a-zA-Z0-9]{8,20}$/.test(password);
		const confirmValid = confirm === password;
		if (!usernameValid || !passwordValid || !confirmValid) {
			setIsValidUsername(usernameValid);
			setIsValidPassword(passwordValid);
			setIsValidConfirm(passwordValid && confirmValid);
			return;
		}
		const userData = await register(username, password);
		if (!userData) {
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
						style={[styles.textInput, !isValidUsername ? styles.error : null]}
						placeholder={'Enter username'}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						onChangeText={setPassword}
						value={password}
						style={[styles.textInput, !isValidPassword ? styles.error : null]}
						placeholder={'Enter password'}
						textContentType={'password'}
						secureTextEntry
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						onChangeText={setConfirm}
						value={confirm}
						style={[styles.textInput, !isValidConfirm ? styles.error : null]}
						placeholder={'Confirm password'}
						textContentType={'password'}
						secureTextEntry
					/>
				</View>
				<Button
					text={errorMsg || 'Register'}
					disabled={!username || !password || !confirm}
					onClick={handleOnSubmit}
					width={300}
				/>
				<View style={styles.formHelperContainer}>
					<Text style={styles.formHelperText}>
						{'Username should be between 3 to 12 numbers or letters'}
					</Text>
					<Text style={styles.formHelperText}>
						{'Password should be between 8 to 20 numbers or letters'}
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
			width: 300,
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
			width: 300,
		},

		formHelperContainer: {
			marginTop: 15,
		},
	});
