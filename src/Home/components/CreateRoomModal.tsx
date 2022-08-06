import React from 'react';
import { useState } from 'react';
import { useTheme, Portal, Modal } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { Text, TextInput, View } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useRouter } from 'next/router';
import { InputRoom } from 'types';
import { createRoom } from 'server/routers';
import { useUserContext } from 'src/common/context/UserContext';
import { useCreateRoomModalContext } from 'src/common/context/CreateRoomModalContext';
import { useMediaQueries, useBreakPoints } from 'utils/responsive';

const { md } = useMediaQueries();

export default function CreateRoomModal() {
	const { user, token, loggedIn } = useUserContext();
	const { isVisible, hideModal } = useCreateRoomModalContext();
	const router = useRouter();

	const [roomName, setRoomName] = useState('');
	const [code, setCode] = useState('');
	const [description, setDescription] = useState('');

	const [isValidRoomName, setIsValidRoomName] = useState(true);
	const [isValidCode, setIsValidCode] = useState(true);
	const [isValidDescription, setIsValidDescription] = useState(true);

	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const { color, font } = useTheme();
	const { isMediumScreen } = useBreakPoints();
	const { styles, ids } = styleSheet(color, font, isMediumScreen);

	const showError = (msg: string) => {
		setErrorMsg(msg);
		setTimeout(() => {
			setErrorMsg('');
		}, 3000);
	};

	const handleOnSubmit = async () => {
		setLoading(true);
		const roomNameValid = /^[a-zA-Z0-9]{1,12}$/.test(roomName);
		const codeValid = /^[0-9]{4,}$/.test(code) || code === '';
		const descriptionValid = description !== '';
		setIsValidRoomName(roomNameValid);
		setIsValidCode(codeValid);
		setIsValidDescription(descriptionValid);
		if (!roomNameValid || !codeValid || !descriptionValid) {
			setLoading(false);
			return;
		}
		if (!user._id) {
			setLoading(false);
			return;
		}
		const room: InputRoom = {
			name: roomName,
			description,
			code,
		};
		const res = await createRoom(room, token);
		if (!res) {
			showError('Room already exists');
			setLoading(false);
			return;
		}
		sessionStorage.setItem(roomName, code);
		router.push(`/room/${roomName}`);
		hideModal();
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
					<View style={styles.inputContainer}>
						<TextInput
							onChangeText={setCode}
							value={code}
							style={[
								styles.textInput,
								!isValidCode ? styles.error : undefined,
								loggedIn ? undefined : { opacity: 0.5 },
							]}
							placeholder={'Enter code (optional)'}
							editable={loggedIn && !loading}
							dataSet={{ media: ids.textInput }}
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
						disabled={!roomName || !description || errorMsg !== ''}
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
							{'Name should be 1-12 numbers/letters'}
						</Text>
						<Text
							style={styles.formHelperText}
							dataSet={{ media: ids.formHelperText }}
						>
							{'Code should be at least 4 numbers'}
						</Text>
					</View>
				</View>
			</Modal>
		</Portal>
	);
}

const styleSheet = (color: Color, font: Font, isMediumScreen: boolean) =>
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

		button: {
			width: isMediumScreen ? 300 : 225,
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
			backgroundColor: color.background,
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
			backgroundColor: color.background,
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

		smallText: {
			fontSize: font.size.secondary,
			fontFamily: font.family.text,
			color: color.text,
		},
	});
