import React from 'react';
import { useState } from 'react';
import { useTheme, Switch, Portal, Modal } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { Text, TextInput, View } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useRouter } from 'next/router';
import { InputRoom } from 'types';
import { createRoom } from 'server/routers';
import { useUserContext } from 'src/common/context/UserContext';
import { useCreateRoomModalContext } from 'src/common/context/CreateRoomModalContext';
import { useMediaQueries } from 'utils/responsive';

const { md } = useMediaQueries();

export default function CreateRoomModal() {
	const { user, token, loggedIn } = useUserContext();
	const { isVisible, hideModal } = useCreateRoomModalContext();
	const router = useRouter();
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
		const roomData = await createRoom(room, token);
		if (!roomData) {
			setLoading(false);
			setErrorMsg('Room name already exists');
			setTimeout(() => {
				setErrorMsg('');
			}, 3000);
			return;
		}
		router.push(`/room/${roomName}`);
	};

	return (
		<Portal>
			<Modal
				visible={isVisible}
				contentContainerStyle={styles.container}
				onDismiss={hideModal}
			>
				<View
					style={styles.formContainer}
					dataSet={{ media: ids.formContainer }}
				>
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
							placeholder={'Enter code'}
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
						style={styles.button}
					/>
					<View
						style={styles.formHelperContainer}
						dataSet={{ media: ids.formHelperContainer }}
					>
						<Text style={styles.formHelperText}>
							{'Name should be 1-12 numbers/letters'}
						</Text>
						<Text style={styles.formHelperText}>
							{'Code should be 4-8 numbers'}
						</Text>
					</View>
				</View>
			</Modal>
		</Portal>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			alignSelf: 'center',
			backgroundColor: color.secondary,
			borderRadius: 5,
		},

		icon: {
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: 1,
		},

		formContainer: {
			padding: 20,
			alignItems: 'center',
		},

		inputContainer: {
			marginBottom: 15,
		},

		switchContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 15,
			width: 225,

			[md]: {
				width: 300,
			},
		},

		button: {
			width: 225,

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
			width: 125,

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
			width: 225,

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
			width: 225,

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
			width: 225,

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
