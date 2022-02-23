import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTheme, HelperText } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { Text, TextInput, View } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useUserContext } from 'src/common/context/UserContext';
import { useRouting } from 'expo-next-react-navigation';

export default function RegisterForm() {
	const router = useRouting();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordHelper, setPasswordHelper] = useState<string>('');
	const [usernameHelper, setUsernameHelper] = useState<string>('');
	const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
	const [isValidUsername, setIsValidUsername] = useState<boolean>(true);
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	useEffect(() => {
		setIsValidUsername(/^[a-zA-Z0-9]{3,12}$/.test(username) || !username);
		setIsValidPassword(/^[a-zA-Z0-9]{1,8}$/.test(password) || !password);
	}, [username, password]);

	const handleOnSubmit = async () => {
		// TODO: validate, and save account
		router.navigate({ routeName: '' });
	};

	return (
		<View style={styles.container}>
			<View style={styles.headingContainer}>
				<Text style={styles.heading}>{'Create a new account'}</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					onChangeText={setUsername}
					value={username}
					style={[styles.textInput, !isValidUsername ? styles.error : null]}
					placeholder={'Enter username'}
				/>
				{/* <HelperText style={styles.helper} visible={!isValidUsername} type={'error'}>
					{usernameHelper}
				</HelperText> */}
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
				{/* <HelperText style={styles.helper} visible={!isValidPassword} type={'error'}>
					{passwordHelper}
				</HelperText> */}
			</View>
			<Button
				text={'Register'}
				disabled={
					!isValidUsername || !isValidUsername || !username || !password
				}
				onClick={handleOnSubmit}
				width={225}
			/>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
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
			height: 50,
			width: 225,
		},
		error: {
			borderColor: color.error,
			borderWidth: 1,
		},
		helper: {
			fontSize: font.size.tertiary,
			fontFamily: font.family.text,
			color: color.error,
			textAlign: 'left',
			alignSelf: 'flex-start',
			paddingHorizontal: 10,
			width: 225,
		},
	});
