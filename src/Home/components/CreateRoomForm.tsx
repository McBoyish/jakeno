import React from 'react';
import { useState } from 'react';
import { useTheme, Switch } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { Text, TextInput, View } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useRouting } from 'expo-next-react-navigation';
import { InputRoom } from 'types';
import { createRoom } from 'server/routers';
import { useUserContext } from 'src/common/context/UserContext';
import { useMediaQueries } from 'utils/responsive';

const { md } = useMediaQueries();

export default function RegisterForm() {
	const { user, token, loggedIn } = useUserContext();
	const router = useRouting();
	const [roomName, setRoomName] = useState('');
	const [code, setCode] = useState('');
	const [locked, setLocked] = useState(false);
	const [description, setDescription] = useState('');
	const [isValidRoomName, setIsValidRoomName] = useState(true);
	const [isValidCode, setIsValidCode] = useState(true);
	const [isValidDescription, setIsValidDescription] = useState(true);
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const { color, font } = useTheme();
	const { styles, ids } = styleSheet(color, font);

	const handleSwitch = (value: boolean) => {
		if (loading) return;
		setCode('');
		setIsValidCode(true);
		setLocked(value);
	};

	const handleOnSubmit = async () => {
		setLoading(true);
		const roomNameValid = /^[a-zA-Z0-9]{1,12}$/.test(roomName);
		const codeValid = /^[0-9]{4,8}$/.test(code);
		const descriptionValid = description !== '';
		setIsValidRoomName(roomNameValid);
		setIsValidCode(!locked || codeValid);
		setIsValidDescription(descriptionValid);
		if (!roomNameValid || (locked && !codeValid) || !descriptionValid) {
			setLoading(false);
			return;
		}
		if (!user._id) {
			setLoading(false);
			return;
		}
		const room: InputRoom = {
			userId: user._id,
			name: roomName,
			description,
			locked,
			code: locked ? code : '',
		};
		await new Promise(r => setTimeout(r, 100000));
		const roomData = await createRoom(room, token);
		if (!roomData) {
			setLoading(false);
			setErrorMsg('Room name already exists');
			setTimeout(() => {
				setErrorMsg('');
			}, 3000);
			return;
		}
		router.navigate({ routeName: `room/${roomData.name}` });
	};

	return (
		<View style={styles.container}>
			<View style={styles.formContainer}>
				<View style={styles.headingContainer}>
					<Text style={styles.heading}>
						{loggedIn ? 'Create a new room!' : 'Login to create rooms!'}
					</Text>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						onChangeText={setRoomName}
						value={roomName}
						style={[
							styles.textInput,
							!isValidRoomName ? styles.error : undefined,
							loggedIn ? undefined : { opacity: 0.5 },
						]}
						placeholder={'Enter room name'}
						editable={loggedIn && !loading}
						dataSet={{ media: ids.textInput }}
					/>
				</View>
				<View
					style={styles.switchContainer}
					dataSet={{ media: ids.switchContainer }}
				>
					<View
						style={[styles.switch, loggedIn ? undefined : { opacity: 0.5 }]}
					>
						<Text style={styles.smallText} dataSet={{ media: ids.smallText }}>
							{'Lock'}
						</Text>
						<View style={styles.spacing} />
						<Switch
							value={locked}
							onValueChange={handleSwitch}
							color={color.primary}
							disabled={!loggedIn}
							style={{ width: 30, height: 15 }}
						/>
					</View>
					<View style={styles.spacing} />
					<TextInput
						onChangeText={setCode}
						value={code}
						style={[
							styles.codeInput,
							!isValidCode ? styles.error : undefined,
							!locked || !loggedIn ? { opacity: 0.5 } : undefined,
						]}
						placeholder={'Enter room code'}
						textContentType={'none'}
						editable={loggedIn && locked && !loading}
						dataSet={{ media: ids.codeInput }}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						onChangeText={setDescription}
						value={description}
						multiline
						style={[
							styles.descriptionInput,
							!isValidDescription ? styles.error : undefined,
							loggedIn ? undefined : { opacity: 0.5 },
						]}
						placeholder={'Enter description'}
						editable={loggedIn && !loading}
						dataSet={{ media: ids.descriptionInput }}
					/>
				</View>
				<Button
					text={errorMsg || 'Create'}
					disabled={
						!roomName || (locked && !code) || !description || errorMsg !== ''
					}
					onClick={handleOnSubmit}
					loading={loading}
					dataSet={{ media: ids.button }}
				/>
				<View
					style={styles.formHelperContainer}
					dataSet={{ media: ids.formHelperContainer }}
				>
					<Text style={styles.formHelperText}>
						{'Room name can be 1 to 12 numbers or letters'}
					</Text>
					{locked && (
						<Text style={styles.formHelperText}>
							{'Room code can be 4 to 8 numbers'}
						</Text>
					)}
				</View>
			</View>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			marginVertical: 5,
			alignSelf: 'center',
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

		switchContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 15,
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

		switch: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: color.tertiary,
			height: 50,
			borderRadius: 5,
			paddingHorizontal: 10,
			justifyContent: 'space-evenly',
		},

		spacing: {
			width: 10,
		},

		heading: {
			fontSize: font.size.heading,
			fontFamily: font.family.heading,
			color: color.text,
			textAlign: 'center',
		},

		codeInput: {
			borderRadius: 5,
			paddingHorizontal: 10,
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			outlineStyle: 'none',
			borderColor: color.primary,
			backgroundColor: color.tertiary,
			color: color.text,
			height: 50,
			width: 150,

			[md]: {
				width: 200,
			},
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

		descriptionInput: {
			borderRadius: 5,
			padding: 10,
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			outlineStyle: 'none',
			borderColor: color.primary,
			backgroundColor: color.tertiary,
			color: color.text,
			height: 100,
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

		smallText: {
			fontSize: font.size.secondary,
			fontFamily: font.family.text,
			color: color.text,

			[md]: {
				fontSize: font.size.primary,
			},
		},
	});
