import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTheme, HelperText } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { Text, TextInput, View } from 'react-native';
import { useBreakPoints } from 'utils/responsive';
import StyleSheet from 'react-native-media-query';
import { useUserContext } from 'src/common/context/UserContext';
import { useRouting } from 'expo-next-react-navigation';

export default function CreateRoomForm() {
	const router = useRouting();
	const [roomName, setRoomName] = useState<string>('');
	const [isValidRoomName, setIsValidRoomName] = useState<boolean>(true);
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	useEffect(() => {
		setIsValidRoomName(/^[a-zA-Z0-9]{1,8}$/.test(roomName) || !roomName);
	}, [roomName]);

	const handleOnSubmit = async () => {
		// TODO
	};

	return (
		<View style={styles.container}>
			<View style={styles.headingContainer}>
				<Text style={styles.heading}>{'Create a room'}</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					onChangeText={setRoomName}
					value={roomName}
					style={[styles.textInput, !isValidRoomName ? styles.error : {}]}
					placeholder={'Enter room name'}
				/>
			</View>
			<Button
				text={'Create'}
				disabled={!isValidRoomName || !roomName}
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
			alignItems: 'center',
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
